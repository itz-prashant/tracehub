import { Router } from "express";
import { authenticateToken } from "../../middleware.ts/authMiddleware";
import { handleTrackEvent } from "../../controllers/eventController";


const eventRouter = Router();

eventRouter.post('/track', handleTrackEvent);

export default eventRouter;
