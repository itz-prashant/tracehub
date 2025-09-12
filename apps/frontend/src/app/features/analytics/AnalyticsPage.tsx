"use client";

import { useState } from "react";
import { getEventCount } from "./analyticsService";

const AnalyticsPage = () => {
  const [eventName, setEventName] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleFetchCount = async () => {
    try {
      const token = localStorage.getItem("authToken") || "";
      const data = await getEventCount(eventName, token);
      setCount(data.count);
      setError("");
    } catch (error: unknown) {
  if (error instanceof Error) {
    setError(error.message);
  } else {
    setError(String(error));
  }
  setCount(null);
}

  };

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <input
        type="text"
        placeholder="Enter event name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <button onClick={handleFetchCount}>Get Event count</button>
      {count !== null && <p>Event Count: {count}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AnalyticsPage;
