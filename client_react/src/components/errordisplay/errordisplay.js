import "./errordisplay.css";
import { useAtom } from "jotai";
import { errorAtom } from "../../stores/statestore.js";
const ErrorDisplay = ({ message, onTryAgain }) => {
  const [, setError] = useAtom(errorAtom);
  const handleTryClick = (e) => {
    e.preventDefault(); // Prevent the default action of the button click event
    setError(false); // Set error to false
    onTryAgain(e); // Pass the event object to onTryAgain callback
  };

  const handleCancel = (e) => {
    e.preventDefault(); // Prevent the default action of the button click event
    setError(false); // Set error to false
  };

  return (
    <div className="error-wrapper">
      <div className="error-container">
        <div className="error-message">{message}</div>
        <button className="error-button" onClick={handleTryClick}>
          Try Again
        </button>
        <button
          style={{ marginLeft: "20px" }}
          className="error-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
