import { Request, Response } from "express";
import { authenticateUser } from "../services/authService";


export async function handleLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const { token, user } = await authenticateUser(email, password);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(401).json({ error: (error as Error).message });
    }
}