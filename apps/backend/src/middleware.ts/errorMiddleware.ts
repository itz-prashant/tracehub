import { Request, Response, NextFunction } from "express";

export function errorHandler(err:any, req:Request, res:Response, next:NextFunction){
    console.log(err.stack)
    res.status(500).json({
        error: err.message || 'Internal server error'
    })
}