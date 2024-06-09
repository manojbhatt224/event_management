import express from 'express'
import dotenv from 'dotenv'
import { customRenderer } from './src/middlewares/customJSONRenderer.js'
import handleAuthentication from './src/middlewares/authMiddleware.js'
import { authRouter } from './src/routes/authRoutes.js'
import { eventRouter } from './src/routes/eventRoutes.js'
import cors from 'cors'

dotenv.config() //for accessing environment variables from .env
const port=process.env.PORT
const app=express()

app.use(cors())
app.use(express.json())
app.use(customRenderer);//for creating standard function to communicate with uniform json format for data

//public
app.use('/api/auth', authRouter);

// protected
app.use('/api/events', handleAuthentication, eventRouter)

app.listen(port, ()=>{
console.log(`Server is serving at port: ${port}`);
})


