import { useState } from "react";

import Login from "../../components/login/login.js";
import "./auth.css";
import SignUp from "../../components/signup/signup.js";

function Auth() {
  var [signup, setSignUp] = useState(false);
  const togglePage = () => {
    setSignUp(!signup);
  };

  return (
    <div className="app">
        <h4 style={{color:"white"}}>Event Management System</h4>
        <div className="auth">
        
        {!signup?<Login />:<SignUp/>}

        <span className="toggle-label" onClick={togglePage}
            >
              {signup
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
          </span>
      </div>
     
    </div>
  );
}

export default Auth;
