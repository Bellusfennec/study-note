import axios from "axios";
// import authLocalStorageService from "../localStorage/authLocalStorage";
// import authService from "./authService";
import { config } from "../app/config";

const http = axios.create({ baseURL: config.API_URL });

http.interceptors.request.use(
  async function (config: any) {
    // const expiresDate = authLocalStorageService.getTokenExpiresIn();
    // const refreshToken = authLocalStorageService.getRefreshToken();
    // if (refreshToken && expiresDate && +expiresDate < Date.now()) {
    //   const { content } = await authService.refresh();
    //   authLocalStorageService.setData(content);
    // }
    // const accessToken = authLocalStorageService.getAccessToken();
    // if (accessToken) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${accessToken}`,
    //   };
    // }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data: any) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : data;
}

http.interceptors.response.use(
  (res) => {
    res.data = { content: transformData(res.data) };

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

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
export default httpService;
