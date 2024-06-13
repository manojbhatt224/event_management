import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteEvent } from "../requests/eventRequests.js";
import { loadingAtom, successAtom } from "../stores/statestore.js";
import { errorAtom } from "../stores/statestore.js";
import { useAtom } from "jotai";
import LoadingSpinner from "./loadingspinner/loadingspinner.js";
import ErrorDisplay from "./errordisplay/errordisplay.js";
import SuccessDisplay from "./successdisplay/successdisplay.js";

const DeleteEventForm = () => {
  const navigate = useNavigate();
  const params=useParams();
  const deleteEvent=useDeleteEvent();


  const [errorText, setErrorText] = useState(null);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);
  const [success]=useAtom(successAtom);
 const [showConfirmation, setShowConfirmation]=useState(true);
 
  const handleDeleteConfirmation = async () => {
   
      try {
        await deleteEvent(params.id)
      } catch (err) {
        setErrorText("Can't Update: Network or Data Error!");
      } finally {
        setLoading(false);
        setShowConfirmation(false);
      }
    
  };

  return (
    <div className="container" style={{ width: "80%", marginTop: "3%" }}>
      {loading && <LoadingSpinner />}
      {success && <SuccessDisplay message={"Successful!"} buttonText="Ok" onButtonClick={()=>{navigate("/")}}/>}
      {error && (
        <ErrorDisplay
          message={errorText}
          onTryAgain={handleDeleteConfirmation}
        />
      )}
      <h2>Deleting Event</h2>
      {showConfirmation &&(
        <div className="confirmation-dialog"> 
          <p>Are you sure you want to delete this event?</p>
          <button className="btn custom-button btn-sm me-1" onClick={handleDeleteConfirmation}>Yes</button>
          <button className="btn custom-button btn-sm" onClick={() => {setShowConfirmation(false);navigate("/")}}>No</button>
        </div>
      )}
</div>
  );
};

export default DeleteEventForm;
