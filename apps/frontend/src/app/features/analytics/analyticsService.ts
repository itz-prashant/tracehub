const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function getEventCount(event_name: string, token: string) {
  const res = await fetch(
    `${API_URL}/analytics/event-count?event_name=${event_name}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch event count");
  return res.json();
}
