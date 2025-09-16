(function () {
  const STORAGE_KEY = "tracehub_distinct_id";
  const API_URL = "http://localhost:4000/api/events/track";

  // Generate UUID
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
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
          ...properties,
          url: window.location.href,
          title: document.title,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
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
function handleFormSubmit(event) {
  const form = event.target;
  sendEvent("form_submit", {
    form_id: form.id || null,
    form_action: form.action || null,
    form_method: form.method || "GET",
    fields_count: form.elements.length,
  });
}

document.addEventListener("submit", handleFormSubmit, true);


})();
