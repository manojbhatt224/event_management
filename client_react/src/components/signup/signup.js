import "./signup.css";
function SignUp() {
  return (
    <>
      <h4>Sign Up</h4>
      <div className="inputFields">
        <div className="subFields">
          <label htmlFor="username">First Name:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="subFields">
          <label htmlFor="username">Last Name:</label>
          <input type="text" id="username" name="username" />
        </div>
      </div>
      <div className="inputFields">
        <div className="subFields">
          <label htmlFor="username">Email:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="subFields">
          <label htmlFor="password">Username:</label>
          <input type="text" id="password" name="password" />
        </div>
      </div>
      <div className="inputFields">
        <div className="subFields">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className="subFields">
          <label htmlFor="password">Confirm Password:</label>
          <input type="password" id="password" name="password" />
        </div>
      </div>

      <button className="custom-button">SignUp</button>
    </>
  );
}

export default SignUp;
