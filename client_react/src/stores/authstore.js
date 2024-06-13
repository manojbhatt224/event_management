import { atom } from 'jotai';
// Define your Jotai atom for authentication state
export const authStateAtom = atom(loadInitialState());
  
  // Use a function to load initial state from localStorage
  function loadInitialState() {
    const initialState = localStorage.getItem('authState');
    return initialState ? JSON.parse(initialState) : {isAuthenticated: false,
        accessToken: null,
        refreshToken: null};
  }

  
  // Update the localStorage whenever authStateAtom changes
  export const persistAuthAtom = atom(
    (get) => get(authStateAtom),
    (get, set, newState) => {
      localStorage.setItem('authState', JSON.stringify(newState));
      set(authStateAtom, newState);
    }
  );