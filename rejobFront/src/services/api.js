import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";
export const TOKEN_KEY = "@rejob-web-Token";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const JWT =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTcwNDk0MDk0NiwiZXhwIjoxNzA0OTQyMzg2fQ.tPRdt_GHGzqO3o9kkE2LsXZt7U1NEEv8i8M4peOrD8w";
  if (JWT != null) {
    config.headers.Authorization = `Bearer ${JWT}`;
  }

  console.log("jdasd", config);

  return config;
});

export default api;
