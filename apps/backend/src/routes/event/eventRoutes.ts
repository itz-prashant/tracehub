import { Router } from "express";
import { authenticateToken } from "../../middleware.ts/authMiddleware";
import { handleCreateEvent, handleGetEventsByWebsite } from "../../controllers/eventController";
import { handleGetEventCount } from "../../controllers/analyticsController";


const eventRouter = Router();

eventRouter.post('/create', authenticateToken, handleCreateEvent);
eventRouter.get('/:websiteId/events', authenticateToken, handleGetEventsByWebsite);
eventRouter.get('/:websiteId/events/count', authenticateToken, handleGetEventCount);

export default eventRouter;
