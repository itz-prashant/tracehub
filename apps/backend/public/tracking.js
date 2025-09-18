(function () {
  const STORAGE_KEY = "tracehub_distinct_id";
  const SESSION_KEY = 'tracehub_session_id';
  const SESSION_START_KEY = 'tracehub_session_started';
  const API_URL = "http://localhost:4000/api/events/track";

  // Generate UUID
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // Extract script_key from script tag
  function getScriptKey() {
    try {
      const currentScript =
        document.currentScript ||
        document.querySelector('script[src*="tracking.js"]');
      if (!currentScript) return null;

      const url = new URL(currentScript.src);
      return url.searchParams.get("id"); // script_key passed as ?id=
    } catch (e) {
      console.error("Failed to extract script_key:", e);
      return null;
    }
  }

  // Distinct ID (per user)
  let distinctId = localStorage.getItem(STORAGE_KEY);
  if (!distinctId) {
    distinctId = generateUUID();
    localStorage.setItem(STORAGE_KEY, distinctId);
  }

  // session key  (per user)
  let sessionId = sessionStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = generateUUID();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  const scriptKey = getScriptKey();
  const pageLoadTime = Date.now();

  // Send event
  function sendEvent(eventName, properties = {}) {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        script_key: scriptKey,
        event_name: eventName,
        properties: {
          url: window.location.href,
          title: document.title,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          ...properties,
        },
        distinct_id: distinctId,
        session_id: sessionId,
        timestamp: new Date().toISOString(),
      }),
    }).catch((error) => {
      console.error("TraceHub event send failed:", error);
    });
  }

  // Send session_start event when session is created
if (!sessionStorage.getItem(SESSION_START_KEY) && !sessionStorage.getItem("session_end_sent")) {
  sendEvent("session_start", { 
    referrer: document.referrer || null,
    timestamp: new Date().toISOString(),
  });
  sessionStorage.setItem(SESSION_START_KEY, "true");
}



  // Public API
  window.tracehubTrackEvent = function (eventName, properties = {}) {
    sendEvent(eventName, properties);
  };

  // ---- Core Tracking ----

  // Add click event handler

  document.addEventListener(
  "click",
  function (event) {
    const target = event.target.closest("a, button, input[type=submit], [role=button]");
    if (!target) return;

    if (target.tagName === "BUTTON" && target.type === "submit") return;
    if (target.tagName === "INPUT" && target.type === "submit") return;

    sendEvent("click", {
      element_tag: target.tagName,
      element_id: target.id || null,
      element_classes: target.className || null,
      element_text: target.innerText?.trim().slice(0, 100) || null,
      href: target.href || null,
      url: window.location.href,   // jis page par click hua
      title: document.title,
    });
  },
  true
);


  // Page view trigger (with delay for correct title)
  function triggerPageView() {
    setTimeout(() => {
      sendEvent("page_view");
    }, 500);
  }

  // Initial page load
  triggerPageView();

  // SPA route changes
  const originalPushState = history.pushState;
  history.pushState = function () {
    originalPushState.apply(this, arguments);
    window.dispatchEvent(new Event("tracehub-route-change"));
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    window.dispatchEvent(new Event("tracehub-route-change"));
  };

  window.addEventListener("popstate", () => {
    window.dispatchEvent(new Event("tracehub-route-change"));
  });

  window.addEventListener("tracehub-route-change", triggerPageView);


  // Core tracking - Add form submit handler
  document.addEventListener(
    "submit",
    function (event) {
      const form = event.target;
      sendEvent("form_submit", {
        form_id: form.id || null,
        form_action: form.action || null,
        form_method: form.method || "POST",
        fields_count: form.elements.length,
        element_text: form.innerText || null,
      });
    },
    true
  );

  // Scroll Tracking Logic

  let maxScrollPercent = 0;
  let scrollEventUrl = window.location.href;

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScrollPercent) {
      maxScrollPercent = scrollPercent;
      scrollEventUrl = window.location.href;
    }
  }

  function sendFinalScrollEvent() {
    const timeSpent = Math.round((Date.now() - pageLoadTime) / 1000);
    sendEvent("scroll_depth", { 
      max_scroll_percentage: maxScrollPercent,
      time_spent_since_page_load: timeSpent,
      url: scrollEventUrl,
    });
  }

  document.addEventListener("scroll", handleScroll);

// window.addEventListener("beforeunload", () => {
//     console.log("navEnetry", navEntries)
//   sendFinalScrollEvent();

//   let navType;

//   // Modern browsers (Navigation Timing Level 2)
//   const navEntries = performance.getEntriesByType("navigation");
//   if (navEntries.length > 0 && "type" in navEntries[0]) {
//     navType = navEntries[0].type; // "navigate" | "reload" | "back_forward"
//   } 
//   // Fallback for old browsers
//   else if (performance.navigation) {
//     navType = performance.navigation.type; // 0=navigate, 1=reload, 2=back_forward
//   }

//   // Agar reload hai, skip session_end
//   if (navType === "reload" || navType === 1) {
//     return;
//   }

//   // Agar back/forward hai, skip bhi kar sakte ho
//   if (navType === "back_forward" || navType === 2) {
//     return;
//   }

//   // Tab close / navigate away → session_end bhejna
//   if (!sessionStorage.getItem("session_end_sent")) {
//     sessionStorage.setItem("session_end_sent", "true");

//     sendEvent("session_end", { 
//       time_spent: Math.round((Date.now() - pageLoadTime) / 1000) 
//     });
//   }
// });

function sendSessionEnd() {
  if (sessionStorage.getItem("session_end_sent")) return;

  sessionStorage.setItem("session_end_sent", "true");

  sendEvent("session_end", {
    time_spent: Math.round((Date.now() - pageLoadTime) / 1000),
  });
}

// 📌 Pagehide → tab close, navigate away, refresh (sab cover karta hai)
window.addEventListener("pagehide", (e) => {
  const navEntry = performance.getEntriesByType("navigation")[0];
  const navType = navEntry?.type || performance.navigation?.type;

  // 🔥 Agar reload hai → session_end skip karo
  if (navType === "reload" || navType === 1) return;

  // 🔥 Agar back/forward hai → skip karna ho to
  if (navType === "back_forward" || navType === 2) return;

  sendSessionEnd();
});

// 📌 Visibilitychange → tab background me gaya ya close hone wala hai
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    sendSessionEnd();
  }
});



  window.addEventListener("tracehub-route-change", () => {
    sendFinalScrollEvent();
    maxScrollPercent = 0;
    scrollEventUrl = window.location.href;
  });

  document.addEventListener(
  "focusin",
  function (event) {
    const target = event.target;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") {
      sendEvent("field_focus", {
        element_tag: target.tagName,
        element_id: target.id || null,
        element_classes: target.className || null,
        element_name: target.name || null,
        element_type: target.type || null,
      });
    }
  },
  true
);

document.addEventListener(
  "focusout",
  function (event) {
    const target = event.target;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") {
      sendEvent("field_blur", {
        element_tag: target.tagName,
        element_id: target.id || null,
        element_classes: target.className || null,
        element_name: target.name || null,
        element_type: target.type || null,
      });
    }
  },
  true
);

window.addEventListener('error', function (event) {
  sendEvent('js_error', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error_stack: event.error ? event.error.stack : null,
  });
});

window.addEventListener('unhandledrejection', function (event) {
  sendEvent('unhandled_promise_rejection', {
    reason: event.reason ? event.reason.toString() : null,
  });
});

})();
