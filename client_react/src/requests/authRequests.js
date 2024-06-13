import { useAtom } from 'jotai';
import { loadingAtom, errorAtom } from '../stores/statestore.js';
import { userStateAtom, persistUserAtom } from '../stores/userstore.js';
import { authStateAtom, persistAuthAtom } from '../stores/authstore.js';
import * as AuthApi from '../api/authAPI.js';

export const useLogin = () => {
  const [, setLoading] = useAtom(loadingAtom);
  const [, setError] = useAtom(errorAtom);
  const [, setUserState] = useAtom(userStateAtom);
  const [, persistUserState] = useAtom(persistUserAtom);
  const [, setAuthState] = useAtom(authStateAtom);
  const [, persistAuthState] = useAtom(persistAuthAtom);

  const login = async (username, password) => {
    setLoading(true);
    await new Promise(resolve => {      //for simulating processing time
      setTimeout(resolve, 500);})
    try {
      const response = await AuthApi.logIn(username, password);
      if (response.data.msg) {
        persistUserState({
          id: response.data.data.user.id,
          username: response.data.data.user.username,
          email: response.data.data.user.email,
          firstName: response.data.data.user.firstName,
          lastName: response.data.data.user.lastName,
          createdAt: response.data.data.user.createdAt
        });

        setUserState({
          id: response.data.data.user.id,
          username: response.data.data.user.username,
          email: response.data.data.user.email,
          firstName: response.data.data.user.firstName,
          lastName: response.data.data.user.lastName,
          createdAt: response.data.data.user.createdAt
        });

        persistAuthState({
          isAuthenticated: true,
          accessToken: response.data.data.token.accessToken,
          refreshToken: response.data.data.token.accessToken,
        });

        setAuthState({
          isAuthenticated: true,
          accessToken: response.data.data.token.accessToken,
          refreshToken: response.data.data.token.accessToken,
        });

        setLoading(false);
        setError(false);
        return response;
      }

    } catch (error) {
      setError(true);
      if (!error.response) {
        error.response = { data: {error: "Network Error"} };
        throw error.response;
      }
      else
      throw error.response.data;
      
    }
  };

  return login;
};


