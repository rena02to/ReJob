import axios from "axios";

export const TOKEN_KEY = "@rejob-web-Token";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
});

api.interceptors.request.use(async (config) => {
  const JWT = localStorage.getItem("token");
  if (JWT != null) {
    config.headers.Authorization = `Bearer ${JWT}`;
  }

  return config;
});

export default api;
