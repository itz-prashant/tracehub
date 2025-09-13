import { Request, Response } from "express";
import { fetchAnalyticsByScriptKey } from "../services/analyticsService";
import { AuthRequest } from "../middleware.ts/authMiddleware";


export async function handleFetchAnalytics(req:AuthRequest, res:Response) {
    const userID = req.userId
    if(!userID){
       return res.status(401).json({ error: 'Unauthorized: User ID missing' });
    }
    try {
        const {script_key} = req.params;
        const analytics = await fetchAnalyticsByScriptKey(script_key)
        res.status(200).json(analytics)
    } catch (error) {
        res.status(500).json({error: (error as Error).message})
    }
}