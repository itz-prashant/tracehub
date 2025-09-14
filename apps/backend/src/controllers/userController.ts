import { Request, Response } from "express";
import { createUser, getAllUser } from "../services/userService";
import { AuthRequest } from "../middleware.ts/authMiddleware";

export async function handleCreateUser(req: Request, res: Response) {
  const {userId, email, password, role } = req.body;
if(!userId){
       return res.status(401).json({ error: 'Unauthorized: User ID missing' });
    }
  try {
    const user = await createUser(email, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
}

export async function handleGetAllUsers(req: AuthRequest, res: Response) {
  const clientId = req.userId;
console.log("clientId", clientId)
  if (!clientId)
    return res.status(401).json({ error: "Unauthorized: User ID missing" });
  try {
    const users = await getAllUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
