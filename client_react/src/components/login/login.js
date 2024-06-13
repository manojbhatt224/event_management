import "./login.css";
import { useState } from "react";
import { useAtom } from "jotai"; // Import useAtom from Jotai
import { useLogin } from "../../requests/authRequests.js";
import LoadingSpinner from "../loadingspinner/loadingspinner.js";
import { loadingAtom, errorAtom } from "../../stores/statestore.js";
import ErrorDisplay from "../errordisplay/errordisplay.js";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("NOERROR");
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);

  const login = useLogin();
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const handleLogin = async (e) => {
    try {
      if (!username || !password) {
        alert("Please fill all fields!");
        return;
      }

      const response = await login(username, password);
    } catch (error) {
      setErrorText(error.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h4>Login</h4>
      <div className="inputField">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </div>

      <div className="inputField">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      {error && <ErrorDisplay message={errorText} onTryAgain={handleLogin} />}
      {/* <p style={{ opacity: error ? '1' : '0' }}>{errorText}</p> */}
      <button
        className="custom-button"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? <LoadingSpinner /> : "Login"}
      </button>
    </>
  );
}
export default Login;
