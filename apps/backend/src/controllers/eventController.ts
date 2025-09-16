import { Request, Response } from "express";
import { trackEvent } from "../services/eventService";


export async function handleTrackEvent(req:Request, res:Response){
    try {
        const {script_key, event_name, properties,distinct_id, timestamp} = req.body
        console.log()
    if (!distinct_id || !event_name || !timestamp) {
    return res.status(400).json({ error: "distinct_id, event_name and timestamp are required" });
  }
    const event = await trackEvent({script_key, event_name, properties, distinct_id,timestamp})
        res.status(201).json({ message: "Event tracked successfully", event });

    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
}
