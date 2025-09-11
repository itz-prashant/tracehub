import { Router } from "express";
import { handleCreateUser, handleGetAllUsers } from "../../controllers/userController";
import { authenticateToken } from "../../middleware.ts/authMiddleware";

const userRouter = Router()

userRouter.post('/user',authenticateToken, handleCreateUser)
userRouter.get('/user',authenticateToken, handleGetAllUsers)

export default userRouter
