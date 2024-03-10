import { config } from "../app/config";
// import authLocalStorageService from "../localStorage/authLocalStorage";
// import { LogIn, SignUp } from "../types";
import axios from "axios";

const http = axios.create({ baseURL: config.API_URL });
http.interceptors.response.use(
  (res) => {
    res.data = { content: res.data };
    return res;
  },
  function (error) {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
      console.log("Что то не так:", error);
    }
    return Promise.reject(error);
  }
);

const authEndPoint = "auth/";

const authService = {
  logIn: async (payload: any) => {
    const { data } = await http.post(authEndPoint + "signInWithPassword", payload);
    return data;
  },
  signUp: async (payload: any) => {
    const { data } = await http.post(authEndPoint + "signUp", payload);
    return data;
  },
  refresh: async () => {
    const { data } = await http.post(authEndPoint + "token", {
      grant_type: "refresh_token",
      // refresh_token: authLocalStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
