import { Request, Response } from "express";
import { createEvents, getAllEvents } from "../services/eventService";


export async function handleCreateEvents(req:Request, res:Response) {
    const {distinct_id, event_name, properties} = req.body;

    try {
        const event = await createEvents(distinct_id, event_name, properties)
        res.status(200).json(event)
    } catch (error) {
        res.json(500).json({error: (error as Error).message})
    }
}

export async function handleGetAllEvents(req:Request, res:Response) {
    try {
        const events = await getAllEvents()
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch events'})
    }
}