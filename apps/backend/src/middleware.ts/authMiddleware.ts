import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth";

export interface AuthRequest extends Request {
    userId?: number;
}

export function authenticateToken(req:Request, res:Response, next:NextFunction){
    const authHeader = req.headers['authorization']
    const token = authHeader;

    if (!token){
        return res.status(401).json({ message: 'Access token missing' });
    }

    try {
        const payload = verifyToken(token)
        console.log('payload', payload)
        // @ts-ignore
        req.userId = payload.userID
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}