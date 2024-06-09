import { eventDAO } from "../dao/eventDAO.js";


function createUpdateEventData(updateEventData){
  const updateData = {};

if (updateEventData.title) {
  updateData.title = updateEventData.title;
}
if (updateEventData.category) {
  updateData.category = updateEventData.category;
}
if (updateEventData.description) {
  updateData.description = updateEventData.description;
}
if (updateEventData.totalParticipants) {
  updateData.totalParticipants = updateEventData.totalParticipants;
}
if (updateEventData.startDate) {
  updateData.startDate = updateEventData.startDate;
}
if (updateEventData.endDate) {
  updateData.endDate = updateEventData.endDate;
}
if (updateEventData.location) {
  updateData.location = updateEventData.location;
}
return updateData;

}
class EventsController {
  static isValidDate(dateString) {
    // Regular expression to validate date format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}
static validateUpdateEvent(updateEventData){
  var errors={}
    
if ("title" in updateEventData && typeof updateEventData.title !== 'string') {
        errors.title = 'Title is required and must be a string';
    }
  if ("category" in updateEventData && typeof updateEventData.category !== 'string') {
    errors.category = 'Category is required and must be a string';
}
if ("description" in updateEventData && typeof updateEventData.description !== 'string') {
    errors.description = 'Description is required and must be a string';
}

if ("totalParticipants" in updateEventData && (typeof updateEventData.totalParticipants !== 'number' || updateEventData.totalParticipants < 0)) {
    errors.totalParticipants = 'Total participants is required and must be a non-negative number';
}

if ("startDate" in updateEventData && !EventsController.isValidDate(updateEventData.startDate)) {
    errors.startDate = 'Start date is required and must be a valid date in the format YYYY-MM-DD';
}

if ("endDate" in updateEventData && !EventsController.isValidDate(updateEventData.endDate)) {
    errors.endDate = 'End date is required and must be a valid date in the format YYYY-MM-DD';
}

if ("location" in updateEventData && typeof updateEventData.location !== 'string') {
    errors.location = 'Location is required and must be a string';
}

return errors;
}
  static validateEvent(title,
    category,
    description,
    totalParticipants,
    startDate,
    endDate,
    location){
      const errors = {};
      if (!title || title !== 'string') {
          errors.title = 'Title is required and must be a string';
      }
    if (!category || typeof category !== 'string') {
      errors.category = 'Category is required and must be a string';
  }
  if (!description || typeof description !== 'string') {
      errors.description = 'Description is required and must be a string';
  }

  if (!totalParticipants || typeof totalParticipants !== 'number' || totalParticipants < 0) {
      errors.totalParticipants = 'Total participants is required and must be a non-negative number';
  }

  if (!startDate || !EventsController.isValidDate(startDate)) {
      errors.startDate = 'Start date is required and must be a valid date in the format YYYY-MM-DD';
  }

  if (!endDate || !EventsController.isValidDate(endDate)) {
      errors.endDate = 'End date is required and must be a valid date in the format YYYY-MM-DD';
  }

  if (!location || typeof location !== 'string') {
      errors.location = 'Location is required and must be a string';
  }

  return errors;
  }
  static async addEvent(req, res) {
    const {  
    title,
    category,
    description,
    totalParticipants,
    startDate,
    endDate,
    location } = req.body;
    const errors= EventsController.validateEvent(title,category,description,totalParticipants,startDate,endDate,location)
      if (Object.keys(errors).length>0){
        res.sendData(401, {
          error: errors,
        });
      }

    else
    {
      try {
        const newEvent = {
          title,
          category,
          description,
          totalParticipants,
          startDate,
          endDate,
          location
        };
        const event = await eventDAO.createEvent(newEvent);
        if(event){
          res.sendData(200, {
            msg: "Event added successfully.",
            event:event
          });
        } 
        else {
          res.sendData(401, { error: "Event addition failed!" });
        }
      } catch (error) {
        res.sendData(401, { error: `${error}` });
      }
    } 
  }
  static async viewEvents(req, res){
    const events=await eventDAO.getAllEvents()
    if (events){
      res.sendData(200,{events:events})
    }
    else{
      res.sendData(200,{events:[]})
    }
  }
  static async viewEvent(req, res){
    const id = req.params.id;
    const event=await eventDAO.getEventByCriteria({id:id})
    if (event){
      res.sendData(200,{event:event})
    }
    else{
      res.sendData(200,{event:null})
    }
  }  
  static async deleteEvent(req, res) {
    const id = req.params.id;
    try{
    const status=await eventDAO.deleteEvent(id)
    if(status){
     res.sendData(200, {msg:"Event Deleted Successfully!"}) 
    }
    else{
      res.sendData(401, {error:"Can't delete event!"})
    }
  }
  catch(error){
    res.sendData(401, {error:error})
  }
  }
  static async updateEvent(req, res) {
    const id = req.params.id;
    const {updateEventData}=req.body;
    const updateData=createUpdateEventData(updateEventData)
    const errors= EventsController.validateUpdateEvent(updateData)
      if (Object.keys(errors).length>0){
        res.sendData(401, {
          error: errors,
        });
      }
    try{
      const status=await eventDAO.updateEvent(id,updateData)
      if(status){
       res.sendData(200, {msg:"Event Updated Successfully!"}) 
      }
      else{
        res.sendData(401, {error:"Can't update event!"})
      }
    }
    catch(error){
      res.sendData(401, {error:error})
    }
    
  }
  }


export { EventsController };
