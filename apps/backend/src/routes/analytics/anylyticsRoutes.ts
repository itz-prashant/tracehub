import {Router} from 'express'
import { authenticateToken } from '../../middleware.ts/authMiddleware'
import { handleGetEventCount, handleGetUserEvent } from '../../controllers/analyticsController'


const analyticsRouter = Router()

analyticsRouter.get('/event-count', authenticateToken, handleGetEventCount)
analyticsRouter.get('/user-events', authenticateToken, handleGetUserEvent)

export default analyticsRouter