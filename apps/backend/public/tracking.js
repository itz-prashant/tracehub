(function () {
  const STORAGE_KEY = "tracehub_distinct_id";
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

  const scriptKey = getScriptKey();

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
        timestamp: new Date().toISOString(),
      }),
    }).catch((error) => {
      console.error("TraceHub event send failed:", error);
    });
  }

  // Public API
  window.tracehubTrackEvent = function (eventName, properties = {}) {
    sendEvent(eventName, properties);
  };

  // ---- Core Tracking ----

  // Add click event handler

  // document.addEventListener(
  //   "click",
  //   function (event) {
  //     const target = event.target;
  //     // Only track clicks on BUTTON and A elements (expand as needed)
  //     if (
  //       (target.tagName === "BUTTON" && target.type !== "submit") ||
  //       target.tagName === "A"
  //     ) {
  //       sendEvent("click", {
  //         element_tag: target.tagName,
  //         element_id: target.id || null,
  //         element_classes: target.className || null,
  //         element_text: target.innerText || null,
  //       });
  //     }
  //   },
  //   true
  // );

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
  const pageLoadTime = Date.now();

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
  window.addEventListener("beforeunload", sendFinalScrollEvent);
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
