import { useAtom } from "jotai";
import * as EventApi from '../api/eventAPI.js'
import { authStateAtom } from "../stores/authstore.js";
import { errorAtom, successAtom, loadingAtom } from "../stores/statestore.js";

export const useGetEvents = () => {
    const [, setLoading] = useAtom(loadingAtom);
    const [, setError] = useAtom(errorAtom);
    const [authState,]=useAtom(authStateAtom)
 
    const getEvents = async () => {
      setLoading(true);
      await new Promise(resolve => {    //process time
        setTimeout(resolve, 500);})
      try {
        const response = await EventApi.getEvents(authState.accessToken);         
        if (response.data.msg) {
          return response.data.data.events
        }
  
      } catch (error) {
        setError(true);
        if (!error.response) {
            error.response = { data: {error: "Network Error"} };
            throw error.response;
          }
          else{
            throw error.response.data;
        }
          
        
      }
    };
  
    return getEvents;
  };

export const useCreateEvent=()=>{
  const [, setLoading] = useAtom(loadingAtom);
  const [, setError] = useAtom(errorAtom);
  const [, setSuccess]=useAtom(successAtom)
  const [authState,]=useAtom(authStateAtom)

  const createEvent = async (newEvent) => {
    setLoading(true);
    await new Promise(resolve => {      //process time
      setTimeout(resolve, 500);})
    try {
      const response = await EventApi.createEvent(authState.accessToken, newEvent);
      if (response.data.msg) {
        setSuccess(true);
        return response.data.data.event
      }

    } catch (error) {
      setError(true);
      if (!error.response) {
          error.response = { data: {error: "Network Error"} };
          throw error.response;
        }
        else{
          throw error.response.data;
      }
     
    }
  };

  return createEvent;

}

export const useGetEvent=()=>{
  const [, setLoading] = useAtom(loadingAtom);
  const [, setError] = useAtom(errorAtom);
  const [authState,]=useAtom(authStateAtom)

  const getEvent = async (eventId) => {
    setLoading(true);
    await new Promise(resolve => {
      setTimeout(resolve, 500);})
    try {
      const response = await EventApi.getEvent(authState.accessToken, eventId);
      if (response.data.msg) {
        return response.data.data.event
      }

    } catch (error) {
      setError(true);
      if (!error.response) {
          error.response = { data: {error: "Network Error"} };
          throw error.response;
        }
        else{
          throw error.response.data;
      }
     
    }
  };

  return getEvent;

}
export const useUpdateEvent=()=>{
  const [, setLoading] = useAtom(loadingAtom);
  const [, setError] = useAtom(errorAtom);
  const [,setSuccess]=useAtom(successAtom);
  const [authState,]=useAtom(authStateAtom)

  const updateEvent = async (eventId, updateEventData) => {
    setLoading(true);
    await new Promise(resolve => {
      setTimeout(resolve, 500);})   //process time simulation
    try {
      const response = await EventApi.updateEvent(authState.accessToken, eventId, {updateEventData});
      if (response.data.msg) {
        setSuccess(true);
        return response.data.data.msg
      }

    } catch (error) {
      setError(true);
      if (!error.response) {
          error.response = { data: {error: "Network Error"} };
          throw error.response;
        }
        else{
          throw error.response.data;
      }
     
    }
  };

  return updateEvent;

}

export const useFilterEvent=()=>{
  const [, setLoading] = useAtom(loadingAtom);
  const [, setError] = useAtom(errorAtom);
  const [authState,]=useAtom(authStateAtom)

  const filterEvent = async (filterData) => {
    setLoading(true);
    await new Promise(resolve => {
      setTimeout(resolve, 100);})   //process time simulation
    try {
      const response = await EventApi.filterEvent(authState.accessToken, {filterData});
      if (response.data.msg) {
        return response.data.data.events
      }

    } catch (error) {
      setError(true);
      if (!error.response) {
          error.response = { data: {error: "Network Error"} };
          throw error.response;
        }
        else{
          throw error.response.data;
      }
        
      
    }
  };
  return filterEvent;

}

export const useDeleteEvent=()=>{
  const [, setLoading] = useAtom(loadingAtom);
  const [, setError] = useAtom(errorAtom);
  const [,setSuccess]=useAtom(successAtom);
  const [authState,]=useAtom(authStateAtom)

  const deleteEvent = async (eventId) => {
    setLoading(true);
    await new Promise(resolve => {
      setTimeout(resolve, 500);})   //process time simulation
    try {
      const response = await EventApi.deleteEvent(authState.accessToken, eventId);
      if (response.data.msg) {
        setSuccess(true);
      }

    } catch (error) {
      setError(true);
          throw error
      
    }
  };

  return deleteEvent;

}
