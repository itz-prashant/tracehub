import { Router } from "express";
import { handleLogin, handleSignup } from "../../controllers/authController";

const authRouter = Router()

authRouter.post('/signup', handleSignup)
authRouter.post('/login', handleLogin)

export default authRouter