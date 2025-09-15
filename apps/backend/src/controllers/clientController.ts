import { Response } from "express";
import { AuthRequest } from "../middleware.ts/authMiddleware";
import { createClient, getAllClients, getClientsByUser } from "../services/clientsService";


export async function handleCreateClient(req:AuthRequest,res:Response) {
    const {email, clientName, password} = req.body
    const userId = req.userId
    if(!userId){
           return res.status(401).json({ error: 'Unauthorized: User ID missing' });
        }
      try {
        const client = await createClient(email, password, clientName);
        res.status(201).json(client);
      } catch (error) {
        res.status(500).json({ error: "Failed to create client" });
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
        res.status(500).json({ error: "Failed to fetch client" });
      }
}

export async function handleGetClientByUser(req:AuthRequest,res:Response) {
    const userId = req.userId
    if(!userId){
           return res.status(401).json({ error: 'Unauthorized: User ID missing' });
    }
    try {
        const client = await getClientsByUser(userId);
        res.status(201).json(client);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch client" });
      }
}