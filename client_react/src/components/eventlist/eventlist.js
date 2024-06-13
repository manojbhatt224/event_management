import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { loadingAtom,errorAtom } from "../../stores/statestore.js";
import { Link } from "react-router-dom";
import { useGetEvents } from "../../requests/eventRequests.js";
import LoadingSpinner from "../loadingspinner/loadingspinner.js";
import ErrorDisplay from "../errordisplay/errordisplay.js";

export function EventList() {
    const [loading, setLoading]=useAtom(loadingAtom)
    const [errorText, setErrorText]=useState('');
    const [error,]=useAtom(errorAtom)
    const [events, setEvents]=useState(null)
    const getEvents=useGetEvents();
    const fetchEvents=async()=>{
        try{
            const myEvents=await getEvents();
            setEvents(myEvents);
        }
        catch(err){
            setErrorText(err.data.error);
        }
        finally{
            setLoading(false);
        }
    }
  useEffect(()=>{
    fetchEvents()

  },[])  
    
  
    return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Events</h2>
      <div className="row mb-3">
        <div className="col" style={{display:"flex", flexDirection:"row"}}>
            <Link className="btn custom-button me-1" to="/addEvent" role="button">Create Event</Link>
            <button type='button' onClick={fetchEvents} className="btn custom-button" style={{backgroundColor:"lightblue", color:"black"}} disabled={loading || error }>Refresh</button>
        </div>
        <div className="col">

        </div>
      </div>
      {loading && <LoadingSpinner/>
    }

        {error && <ErrorDisplay message={errorText} onTryAgain={fetchEvents}/>}
    { !loading && Array.isArray(events) &&  events.length===0 && <p>No Events Found</p>}
      {!loading && Array.isArray(events) && events.length > 0 && <table className="table">
        <thead>
            <tr>
                <th>S.N.</th>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Participants</th>
                <th>Start </th>
                <th>End </th>
                <th>Location</th>
                <th>Actions</th>

            </tr>
        </thead>
        <tbody>
            {
                events.map((event,index)=>{
                    return (
                        <tr key={event.id}>
                            <td>{index+1}</td>
                            <td>{event.title}</td>
                            <td>{event.description}</td>
                            <td>{event.category}</td>
                            <td>{event.totalParticipants}</td>
                            <td>{event.startDate}</td>
                            <td>{event.endDate}</td>
                            <td>{event.location}</td>
                            <td style={{width:"10px", whiteSpace:"nowrap"}}><Link to={"/editevent/"+event.id} className="btn custom-button btn-sm me-1">Edit</Link>
                            <Link to={"/deleteevent/"+event.id} className="btn btn-danger btn-sm">Delete</Link>
                            </td>
                            
                        </tr>
                    )
                })
            }
        </tbody>
        </table>}
    </div>
  );
}
