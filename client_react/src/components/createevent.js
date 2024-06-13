import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateEvent } from "../requests/eventRequests.js";
import { loadingAtom, errorAtom, successAtom } from "../stores/statestore.js";
import { useAtom } from "jotai";
import LoadingSpinner from "./loadingspinner/loadingspinner.js";
import ErrorDisplay from "./errordisplay/errordisplay.js";
import SuccessDisplay from "./successdisplay/successdisplay.js";

const CreateEventForm = () => {
  const navigate = useNavigate();
  const [valErrors, setValErrors] = useState({});
  const [errorText, setErrorText] = useState(null);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);
  const [success]=useAtom(successAtom)
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "",
    totalParticipants: 0,
    startDate: "",
    endDate: "",
    location: "",
  });
  const createEvent = useCreateEvent();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "totalParticipants") {
      setEventData({ ...eventData, [name]: parseInt(value) });
      return;
    }
    setEventData({
      ...eventData,
      [name]: value,
    });
  };
  const validateData = (e) => {
    const validationErrors = {};
    Object.keys(eventData).forEach((key) => {
      if (key === "totalParticipants") {
        if (isNaN(eventData[key]) || eventData[key] <= 0) {
          validationErrors[key] = "Please enter a valid number greater than 0";
        }
      } else if (!eventData[key]) {
        validationErrors[key] = "This field is required.";
      } else if (
        typeof eventData[key] === "string" &&
        eventData[key].length < 3
      ) {
        validationErrors[key] = "At least 3 characters required.";
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setValErrors(validationErrors);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateData(e)) {
      try {
        const myNewEvent = await createEvent(eventData);
      } catch (err) {
        setErrorText("Can't create event: Network Error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container" style={{ width: "80%", marginTop: "3%" }}>
      {loading && <LoadingSpinner />}
      {success && <SuccessDisplay message={"Successful!"} buttonText="Ok" onButtonClick={()=>{navigate("/")}}/>}
      {error && (
        <ErrorDisplay
          message={errorText}
          onTryAgain={handleSubmit}
        />
      )}
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={eventData.title}
            onChange={handleChange}
          />
          {valErrors.title && (
            <div className="text-danger h6">{valErrors.title}</div>
          )}
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={eventData.description}
            onChange={handleChange}
          ></textarea>
          {valErrors.description && (
            <div className="text-danger h6">{valErrors.description}</div>
          )}
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={eventData.category}
            onChange={handleChange}
          />
          {valErrors.category && (
            <div className="text-danger h6">{valErrors.category}</div>
          )}
        </div>
        <div className="form-group">
          <label>Total Participants:</label>
          <input
            type="number"
            className="form-control"
            name="totalParticipants"
            value={eventData.totalParticipants}
            onChange={handleChange}
          />
          {valErrors.totalParticipants && (
            <div className="text-danger h6">{valErrors.totalParticipants}</div>
          )}
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            value={eventData.startDate}
            onChange={handleChange}
          />
          {valErrors.startDate && (
            <div className="text-danger h6">{valErrors.startDate}</div>
          )}
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            value={eventData.endDate}
            onChange={handleChange}
          />
          {valErrors.endDate && (
            <div className="text-danger h6">{valErrors.endDate}</div>
          )}
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={eventData.location}
            onChange={handleChange}
          />
          {valErrors.location && (
            <div className="text-danger h6">{valErrors.location}</div>
          )}
        </div>
        <div style={{ marginTop: "20px" }}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/">
            <button
              style={{ marginLeft: "10%" }}
              className="btn btn-danger ml-20"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
