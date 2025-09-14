import analyticsRouter from "./analytics/anylyticsRoutes";
import authRouter from "./auth/authRoutes";
import clientRouter from "./clients/clientRoutes";
import eventRouter from "./event/eventRoutes";
import userRouter from "./user/userRoutes";
import websiteRouter from "./website/websiteRoutes";

const routes = {
    userRouter,
    eventRouter,
    authRouter,
    analyticsRouter,
    websiteRouter,
    clientRouter
}

export default routes;