import analyticsRouter from "./analytics/anylyticsRoutes";
import authRouter from "./auth/authRoutes";
import eventRouter from "./event/eventRoutes";
import userRouter from "./user/userRoutes";
import websiteRouter from "./website/websiteRoutes";

const routes = {
    userRouter,
    eventRouter,
    authRouter,
    analyticsRouter,
    websiteRouter
}

export default routes;