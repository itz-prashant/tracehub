import { Request, Response } from "express";
import { trackEvent } from "../services/eventService";


export async function handleTrackEvent(req:Request, res:Response){
    try {
        const {script_key, event_name, properties, distinct_id} = req.body
        if (!script_key || !event_name) {
      return res.status(400).json({ message: "script_key and event_name are required" });
    }

    const event = await trackEvent({script_key, event_name, properties, distinct_id})
        res.status(201).json({ message: "Event tracked successfully", event });

    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
}
