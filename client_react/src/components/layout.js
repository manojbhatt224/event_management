import { useAtom } from "jotai";
import { persistUserAtom, userStateAtom } from "../stores/userstore.js";
import { authStateAtom, persistAuthAtom } from "../stores/authstore.js";
import { Link } from "react-router-dom";

export function Navbar() {
    const [userState,setUserState]=useAtom(userStateAtom);
    const [,persistUserState]=useAtom(persistUserAtom);
    const [,setAuthState]=useAtom(authStateAtom);
    const [,persistAuthState]=useAtom(persistAuthAtom);
    const logout=async ()=>{
        persistUserState({});
        setUserState({});
        persistAuthState({
            isAuthenticated:false,
            accessToken:null,
            refreshToken:null
        })
        setAuthState({
            isAuthenticated:null,
            accessToken:null,
            refreshToken:null
        })
    }
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="data:image/png;base64,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" alt="logo" width="30" className="me 2"/>Event Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <a className="nav-link text-dark" aria-current="page"
                Home
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a className="nav-link tex-dark width-5"
                New Event
              </a>
            </li> */}
          </ul>
          <ul className="navbar-nav text-dark">
          <li className="nav-item dropdown">
              <p
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userState.username}
              </p>
              <ul className="dropdown-menu">
                <li>
                  <p className="dropdown-item disabled">
                    Change Password
                  </p>
                </li>
                <li>
                  <p className="dropdown-item disabled"> 
                    Show my profile
                  </p>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <p onClick={logout} className="dropdown-item">
                    Log Out
                  </p>
                </li>
              </ul>
            </li>
          </ul>
          {/* <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
}
