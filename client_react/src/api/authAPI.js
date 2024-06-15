
import axios from "axios";
const API=axios.create({baseURL:"http://localhost:5000"})
export const logIn=(username,password)=>API.post('/api/auth/login', {username,password})

export const refreshMyToken=(refreshToken)=>API.post('/api/auth/refreshtoken', { 
    headers: {
      'Authorization': `Bearer ${refreshToken}`,
    'Content-Type': `application/json`    
    }
    
    })

    