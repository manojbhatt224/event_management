
import axios from "axios";
const API=axios.create({baseURL:"http://localhost:5000"})
export const logIn=(username,password)=>API.post('/api/auth/login', {username,password})

