import React from "react";
import "./successdisplay.css"; // Make sure to import your success display CSS file
import { useAtom } from "jotai";
import { successAtom } from "../../stores/statestore.js";

const SuccessDisplay = ({ message, buttonText = "Ok", onButtonClick }) => {
  const [, setSuccess] = useAtom(successAtom);

  const handleButtonClick = (e) => {
    e.preventDefault(); 
    setSuccess(false);
    if (typeof onButtonClick === "function") {
      onButtonClick(e);
    }
  };

  return (
    <div className="success-wrapper">
      <div className="success-container">
        <div className="success-message">{message}</div>
        <button className="success-button" onClick={handleButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuccessDisplay;
