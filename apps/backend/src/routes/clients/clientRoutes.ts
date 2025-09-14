import { Router } from "express";
import { authenticateToken } from "../../middleware.ts/authMiddleware";
import { handleCreateClient, handleGetAllClient } from "../../controllers/clientController";

const clientRouter = Router()

clientRouter.post('/', authenticateToken, handleCreateClient)
clientRouter.get('/', authenticateToken, handleGetAllClient)

export default clientRouter