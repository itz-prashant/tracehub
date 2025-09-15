import { Response } from "express";
import { AuthRequest } from "../middleware.ts/authMiddleware";
import { createWebsite, getWebsiteByClient } from "../services/websiteService";


export async function handleCreateWebsite(req:AuthRequest, res:Response) {
    const {name, url} = req.body
    const userId = req.userId

    if(!userId) return res.status(401).json({ error: 'Unauthorized: User ID missing' });

    try {
        const website = await createWebsite(userId, name, url)
        res.status(201).json(website);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: (error as Error).message });
    }
}

export async function handleGetWebsite(req:AuthRequest, res:Response){
    const userId = req.userId;
    
    if(!userId) return res.status(401).json({ error: 'Unauthorized: User ID missing' });

     try {
        const websites = await getWebsiteByClient(userId);
        res.status(200).json(websites);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}