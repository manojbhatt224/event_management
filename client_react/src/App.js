import Auth from "./pages/auth/auth.js";
import { useAtom } from "jotai";
import {authStateAtom} from "./stores/authstore.js"

import './App.css'
import Events from "./pages/home/events.js";
function App() {
  
  const [authState,] = useAtom(authStateAtom);

  
  
  return (
    <>
    {authState.isAuthenticated?<Events/>:<Auth/>}
    </>
  );
}

export default App;
