import { Router } from "express";
import { handleCreateUser, handleGetAllUsers } from "../../controllers/userController";

const userRouter = Router()

userRouter.post('/user', handleCreateUser)
userRouter.get('/user', handleGetAllUsers)

export default userRouter
