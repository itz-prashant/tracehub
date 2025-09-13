import { Response } from "express";
import { createEvent, getEventsByWebsite, getEventCountByWebsite } from "../services/eventService";
import { AuthRequest } from "../middleware.ts/authMiddleware";

export async function handleCreateEvent(req: AuthRequest, res: Response) {
    const { websiteId, event_name, properties } = req.body;

    try {
        const event = await createEvent(websiteId, event_name, properties);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export async function handleGetEventsByWebsite(req: AuthRequest, res: Response) {
    const { websiteId } = req.params;

    try {
        const events = await getEventsByWebsite(Number(websiteId));
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
}

export async function handleGetEventCount(req: AuthRequest, res: Response) {
    const { websiteId } = req.params;

    try {
        const count = await getEventCountByWebsite(Number(websiteId));
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get event count' });
    }
}
