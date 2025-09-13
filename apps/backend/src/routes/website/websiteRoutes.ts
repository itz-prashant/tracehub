import { Router } from "express";
import { authenticateToken } from "../../middleware.ts/authMiddleware";
import { handleCreateWebsite, handleGetWebsite } from "../../controllers/websiteController";

const websiteRouter = Router();

websiteRouter.post('/', authenticateToken, handleCreateWebsite)
websiteRouter.get('/', authenticateToken, handleGetWebsite)

export default websiteRouter;
