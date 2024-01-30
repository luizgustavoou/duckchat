import axios from "axios";
import { baseURL } from "./config";
// ler: https://blog.theashishmaurya.me/handling-jwt-access-and-refresh-token-using-axios-in-react-app

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {}
);
