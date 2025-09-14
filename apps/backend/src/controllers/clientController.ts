import { Response } from "express";
import { AuthRequest } from "../middleware.ts/authMiddleware";
import { createClient, getAllClients } from "../services/clientsService";


export async function handleCreateClient(req:AuthRequest,res:Response) {
    const {clientName} = req.body
    const userId = req.userId
    if(!userId){
           return res.status(401).json({ error: 'Unauthorized: User ID missing' });
        }
      try {
        const user = await createClient(userId, clientName);
        res.status(201).json(user);
      } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
      }
}

export async function handleGetAllClient(req:AuthRequest,res:Response) {
    const userId = req.userId
    if(!userId){
           return res.status(401).json({ error: 'Unauthorized: User ID missing' });
    }
    try {
        const user = await getAllClients();
        res.status(201).json(user);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
      }
}