
import axios from "axios";



const API=axios.create({baseURL:"http://localhost:5000"})


export const getEvents=(accessToken)=>API.get('/api/events',  {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }})
export const createEvent=(accessToken, event)=>API.post('/api/events', JSON.stringify(event), { 
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': `application/json`      
      }
      })
  export const getEvent=(accessToken, eventid)=>API.get('/api/events/'+eventid, { 
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': `application/json`      
        }
        })
    
  export const updateEvent=(accessToken, eventid, updateData)=>API.put('/api/events/'+eventid, JSON.stringify(updateData), { 
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': `application/json`      
          }
          })
  export const deleteEvent=(accessToken, eventid)=>API.delete('/api/events/'+eventid, { 
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            'Content-Type': `application/json`    
            }
            })