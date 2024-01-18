import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";
export const TOKEN_KEY = "@rejob-web-Token";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const JWT = sessionStorage.getItem("token");
  if (JWT != null) {
    config.headers.Authorization = `Bearer ${JWT}`;
    console.log(config.headers.Authorization);
  }

  return config;
});

export default api;
