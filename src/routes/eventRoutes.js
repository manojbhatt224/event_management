import express from 'express';
import { EventsController } from '../controller/eventsController.js';

const eventRouter=express.Router();
eventRouter.post('/', EventsController.addEvent)
eventRouter.get('/', EventsController.viewEvents)
eventRouter.delete('/:id', EventsController.deleteEvent)
eventRouter.put('/:id', EventsController.updateEvent)
eventRouter.get('/:id', EventsController.viewEvent)



export {eventRouter}