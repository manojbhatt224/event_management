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



        persistAuthState({
          isAuthenticated: true,
          accessToken: response.data.data.token.accessToken,
          refreshToken: response.data.data.token.refreshToken,
        });
        setUserState({
          id: response.data.data.user.id,
          username: response.data.data.user.username,
          email: response.data.data.user.email,
          firstName: response.data.data.user.firstName,
          lastName: response.data.data.user.lastName,
          createdAt: response.data.data.user.createdAt
        });
        setAuthState({
          isAuthenticated: true,
          accessToken: response.data.data.token.accessToken,
          refreshToken: response.data.data.token.refreshToken,
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

export const useRefreshMyToken = () => {
  const [authState, setAuthState] = useAtom(authStateAtom);
  const [, persistAuthState] = useAtom(persistAuthAtom);

  const refreshMyToken = async () => {
    try {
      console.log(authState.refreshToken)
      const response = await AuthApi.refreshMyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhZTk2MDBhLTk1YzItNDM5NC1hZTk0LWMyMWYxMjM3YWZlZCIsInVzZXJuYW1lIjoia2FwaWxAMTIzIiwiaWF0IjoxNzE4NDYzNjQyLCJleHAiOjE3MTg0NjM3NjJ9.ddYfzs7QPglDsTBimwmMYTDENrfz7YkBV3Lxea7BB9A");
      if (response.data.msg) {
        persistAuthState({
          isAuthenticated: true,
          accessToken: response.data.data.token.accessToken,
          refreshToken: response.data.data.token.refreshToken,
        });

        setAuthState({
          isAuthenticated: true,
          accessToken: response.data.data.token.accessToken,
          refreshToken: response.data.data.token.refreshToken,
        });

        return response;
      }

    } catch (error) {
      throw error
    }
  };

  return refreshMyToken;
};
