import { atom } from 'jotai';
// Define your Jotai atom for authentication state
export const userStateAtom = atom(loadInitialState());
  
  // Use a function to load initial state from localStorage
  function loadInitialState() {
    const initialState = localStorage.getItem('userState');
    return initialState ? JSON.parse(initialState) : {}
  }

  
  // Update the localStorage whenever authStateAtom changes
  export const persistUserAtom = atom(
    (get) => get(userStateAtom),
    (get, set, newState) => {
      localStorage.setItem('userState', JSON.stringify(newState));
      set(userStateAtom, newState);
    }
  );