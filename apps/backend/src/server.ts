import express from 'express'
import routes from './routes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api', routes.userRouter);
app.use('/api', routes.eventRouter);

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})