import { Router } from "express";
import { handleCreateEvents, handleGetAllEvents } from "../../controllers/eventController";

const eventRouter = Router()

eventRouter.post('/events', handleCreateEvents)
eventRouter.get('/events', handleGetAllEvents)

export default eventRouter