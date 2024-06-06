import express from 'express';
import { AuthController } from '../controller/authController.js';

const authRouter=express.Router();
authRouter.post('/login', AuthController.loginUser )



export {authRouter}