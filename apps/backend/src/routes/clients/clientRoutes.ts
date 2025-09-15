import { Router } from "express";
import { authenticateToken } from "../../middleware.ts/authMiddleware";
import { handleCreateClient, handleGetAllClient, handleGetClientByUser } from "../../controllers/clientController";

const clientRouter = Router()

clientRouter.post('/', authenticateToken, handleCreateClient)
clientRouter.get('/', authenticateToken, handleGetAllClient)
clientRouter.get('/user', authenticateToken, handleGetClientByUser)

export default clientRouter