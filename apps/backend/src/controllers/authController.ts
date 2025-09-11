import { Request, Response } from "express";
import { login, signup } from "../services/authService";


export async function handleSignup(req:Request, res:Response) {
    const {distinct_id, email, password, properties} = req.body

    try {
        const {user, token} = await signup(distinct_id, email, password, properties)
        res.status(201).json({user, token})
    } catch (error) {
        res.status(400).json({message: (error as Error).message})
    }
}

export async function handleLogin(req:Request, res:Response){
    const {email, password} = req.body

    try {
        const {user , token} = await login(email, password)
        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({message: (error as Error).message})
    }
}