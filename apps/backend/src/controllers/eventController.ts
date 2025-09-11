import { Request, Response } from "express";
import { createEvents, getAllEvents } from "../services/eventService";
import { AuthRequest } from "../middleware.ts/authMiddleware";


export async function handleCreateEvents(req: AuthRequest, res: Response) {
    const { event_name, properties } = req.body;
    const userId = req.userId;
    console.log("userId", userId);

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: User ID missing' });
    }

    try {
        const event = await createEvents(userId, event_name, properties);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export async function handleGetAllEvents(req: AuthRequest, res: Response) {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: User ID missing' });
    }

    try {
        const events = await getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
}