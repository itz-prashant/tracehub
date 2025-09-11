import authRouter from "./auth/authRoutes";
import eventRouter from "./event/eventRoutes";
import userRouter from "./user/userRoutes";

const routes = {
    userRouter,
    eventRouter,
    authRouter
}

export default routes;