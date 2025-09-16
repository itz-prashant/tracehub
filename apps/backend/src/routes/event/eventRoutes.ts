import { Router } from "express";
import { handleTrackEvent } from "../../controllers/eventController";


const eventRouter = Router();

eventRouter.post('/track', handleTrackEvent);

export default eventRouter;
