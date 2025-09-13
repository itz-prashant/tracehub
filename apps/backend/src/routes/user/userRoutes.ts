import { Router } from "express";
import { handleGetAllUsers } from "../../controllers/userController";
import { authenticateToken } from "../../middleware.ts/authMiddleware";

const userRouter = Router()

// userRouter.post('/user',authenticateToken, handleCreateUser)
userRouter.get('/',authenticateToken, handleGetAllUsers)

export default userRouter
