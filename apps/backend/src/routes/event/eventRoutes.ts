import { Router } from "express";
import { handleCreateEvents, handleGetAllEvents } from "../../controllers/eventController";
import { authenticateToken } from "../../middleware.ts/authMiddleware";

const eventRouter = Router()

eventRouter.post('/events',authenticateToken, handleCreateEvents)
eventRouter.get('/events',authenticateToken, handleGetAllEvents)

export default eventRouter