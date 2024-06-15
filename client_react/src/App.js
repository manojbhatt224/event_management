import Auth from "./pages/auth/auth.js";
import { useAtom } from "jotai";
import { jwtDecode } from "jwt-decode";
import { userStateAtom, persistUserAtom } from "./stores/userstore.js";
import { authStateAtom, persistAuthAtom } from "./stores/authstore.js";


import "./App.css";
import Events from "./pages/home/events.js";
import { useEffect } from "react";
function App() {
  const [authState, setAuthState] = useAtom(authStateAtom);
  const [, persistAuthState] = useAtom(persistAuthAtom);
  const [, setUserState] = useAtom(userStateAtom);
  const [, persistUserState] = useAtom(persistUserAtom);
  const logout = async () => {
    persistUserState({});
    setUserState({});
    persistAuthState({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
    });
    setAuthState({
      isAuthenticated: null,
      accessToken: null,
      refreshToken: null,
    });
  };
  const refreshMyToken = async (refreshToken) => {
    const baseURL = "http://localhost:5000";
  try {
    const response = await fetch(`${baseURL}/api/auth/refreshtoken`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
        'Content-Type': 'application/json'
      }
     
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token'); 
    }

    const data = await response.json();
    if (data.msg) {
      console.log(data.data);
      persistAuthState({
        isAuthenticated: true,
        accessToken: data.data.token.accessToken,
        refreshToken: data.data.token.refreshToken
      });
      setAuthState({
        isAuthenticated: true,
        accessToken: data.data.token.accessToken,
        refreshToken: data.data.token.refreshToken
      });
    } else {
      throw new Error('Unexpected response format'); 
    }
  } catch (error) {
    throw error;
  }
};
  const checkTokenExpiry = () => {
    const { accessToken, refreshToken } = authState;
    if (accessToken) {
      console.log("Access Token Present")
      try {
        const decodedAccessToken = jwtDecode(accessToken);
        const expiryTime = decodedAccessToken.exp * 1000;
        console.log("Access Expiry Time", expiryTime)
        if (Date.now() > expiryTime) {
          console.log("Access Token Expired")
          if (refreshToken) {
            console.log("Refresh Token Present")
            const decodedRefreshToken=jwtDecode(refreshToken)
            const expiryPeriod=decodedRefreshToken.exp *1000;
            console.log("Refresh Expiry Time", expiryPeriod)
            console.log(Date.now())
            if (Date.now()>expiryPeriod){
              console.log("Refresh Token Expired")
              logout();
            }
            else{
              console.log("Refreshing Token!")
              refreshMyToken(authState.refreshToken);
            }
          } else {
            console.log("Refresh token not present")
            logout();
          }
        }
      } catch (error) {
        console.error("Error refreshing access token:", error);
        logout();
      }
    }
  };
  useEffect(()=>{
    checkTokenExpiry();
    const interval = setInterval(checkTokenExpiry, 60000); // Check token expiry every minute
    return () => clearInterval(interval);
  },[authState, setAuthState])

  return <>{authState.isAuthenticated ? <Events /> : <Auth />}</>;
}

export default App;
