import {Router} from 'express'
import { authenticateToken } from '../../middleware.ts/authMiddleware'
import { handleFetchAnalytics } from '../../controllers/analyticsController'

const analyticsRouter = Router()

analyticsRouter.get('/:script_key', authenticateToken, handleFetchAnalytics)

export default analyticsRouter