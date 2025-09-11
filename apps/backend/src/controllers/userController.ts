import { Request, Response } from "express";
import { createUser, getAllUser } from "../services/userService";


export async function handleCreateUser(req:Request, res:Response) {
    const {distinct_id, properties, email, password} = req.body;

    try {
        const user  = await createUser(distinct_id, properties, email, password)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({error: "Failed to create user"})
    }
}

export async function handleGetAllUsers(req:Request, res:Response) {
    try {
        const users = await getAllUser()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch users"})
    }
}