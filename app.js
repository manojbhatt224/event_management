import express from 'express'
import dotenv from 'dotenv'
import { customRenderer } from './src/middlewares/customJSONRenderer.js'
import handleAuthentication from './src/middlewares/authMiddleware.js'
import { authRouter } from './src/routes/authRoutes.js'


dotenv.config() //for accessing environment variables from .env
const port=process.env.PORT
const app=express()

app.use(express.json())
app.use(customRenderer);//for creating standard function to communicate with uniform json format for data

//public
app.use('/api/auth', authRouter);

// protected
app.use('/api/events', handleAuthentication)

app.listen(port, ()=>{
console.log(`Server is serving at port: ${port}`);
})


