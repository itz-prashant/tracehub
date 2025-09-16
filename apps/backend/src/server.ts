import express from 'express'
import routes from './routes'
import dotenv from 'dotenv'
import cors from 'cors'
import { errorHandler } from './middleware.ts/errorMiddleware'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("public"));

app.use('/api/auth', routes.authRouter);
app.use('/api/events', routes.eventRouter);
app.use('/api/websites', routes.websiteRouter);
app.use('/api/users', routes.userRouter);
app.use('/api/clients', routes.clientRouter);
app.use('/api/analytics', routes.analyticsRouter);

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})