"use client";

import { useEffect, useState } from "react";
import { fetchEventCount } from "./analyticsService";

const AnalyticsPage = () => {
  const [eventCount, setEventCount] = useState<number | null>(null);

  useEffect(()=>{
    async function loadEventCount() {
        const count = await fetchEventCount("page_view")
        setEventCount(count)
    }
    loadEventCount()
  }, [])

  return (
   <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      
      {eventCount !== null ? (
        <div className="p-4 bg-blue-100 rounded shadow">
          <p className="text-lg">Page View Count: {eventCount}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AnalyticsPage;
