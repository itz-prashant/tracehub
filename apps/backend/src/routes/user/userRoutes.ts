import { Router } from "express";
import { handleCreateUser, handleGetAllUsers } from "../../controllers/userController";
import { authenticateToken } from "../../middleware.ts/authMiddleware";

const userRouter = Router()

userRouter.post('/',authenticateToken, handleCreateUser)
userRouter.get('/',authenticateToken, handleGetAllUsers)

export default userRouter
