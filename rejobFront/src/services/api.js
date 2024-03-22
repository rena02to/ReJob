import axios from "axios";
import { environment } from "../environment";

export const TOKEN_KEY = "@rejob-web-Token";

const api = axios.create({
  baseURL: environment.api,
});

api.interceptors.request.use(async (config) => {
  const JWT = localStorage.getItem("token");
  if (JWT != null) {
    config.headers.Authorization = `Bearer ${JWT}`;
  }

  return config;
});

export default api;
