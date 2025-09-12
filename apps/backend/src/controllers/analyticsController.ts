import { Response } from "express";
import { getEventByName, getEventByUser } from "../services/analyticsService";
import { AuthRequest } from "../middleware.ts/authMiddleware";


export async function handleGetEventCount(req:AuthRequest, res:Response) {
    const {event_name} = req.query;

    if (typeof event_name !== 'string') {
        return res.status(400).json({ error: 'Invalid event name' });
    }
    try {
        const count = await getEventByName(event_name)
        res.status(200).json({event_name, count})
    } catch (error) {
        res.status(500).json({error: (error as Error).message})
    }
}

export async function handleGetUserEvent(req:AuthRequest, res:Response) {
    const user_id = req.userId
    if (!user_id) {
        return res.status(401).json({ error: 'Unauthorized: User ID missing' });
    }

    try {
        const events = await getEventByUser(user_id)
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}