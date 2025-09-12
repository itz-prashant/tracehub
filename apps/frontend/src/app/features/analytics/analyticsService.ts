const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchEventCount(event_name: string): Promise<number> {
    const res = await fetch(`${API_URL}/analytics/event-count?event_name=${event_name}`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('authToken') || ''
        }
    })

    if (!res.ok) throw new Error('Failed to fetch event count')

    const data = await res.json()
    return data.count
}

