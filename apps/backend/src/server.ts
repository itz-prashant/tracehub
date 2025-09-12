import express from 'express'
import routes from './routes'
import dotenv from 'dotenv'
import { errorHandler } from './middleware.ts/errorMiddleware'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api', routes.userRouter);
app.use('/api', routes.eventRouter);
app.use('/api/auth', routes.authRouter);
app.use('/api/auth', routes.analyticsRouter);

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})