import axios from "axios";
import { environment } from "../environment";

export const TOKEN_KEY = "@rejob-web-Token";

const api = axios.create({
  baseURL:'http://localhost:8080/api/v1/',
});

api.interceptors.request.use(async (config) => {
  const JWT = sessionStorage.getItem("token");
  if (JWT != null) {
    config.headers.Authorization = `Bearer ${JWT}`;
  }

  return config;
});

export default api;
