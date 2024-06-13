import { Navbar } from '../../components/layout.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from '../../components/notfound.js';
import { EventList } from '../../components/eventlist/eventlist.js';
import CreateEventForm from '../../components/createevent.js';
import EditEventForm from '../../components/editevent.js';
import DeleteEventForm from '../../components/deleteevent.js';
function Events(){
    return(
        <BrowserRouter>
        <div className="container">
        <Navbar/>
        <Routes>
            <Route path='/' element={<EventList/>}/>
            <Route path='/addevent' element={<CreateEventForm/>}/>
            <Route path='/editevent/:id' element={<EditEventForm/>}/>
            <Route path='/deleteevent/:id' element={<DeleteEventForm/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
         </div>   
         </BrowserRouter>
        )}

  

export default Events;