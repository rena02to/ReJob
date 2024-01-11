import axios from "axios";

const BASE_URL = "http://localhost:8080/";
export const TOKEN_KEY = "@rejob-web-Token";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const JWT =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTcwNDkzNzkxNywiZXhwIjoxNzA0OTM5MzU3fQ.ZCty0XVSgEjt_DwsG4jHcx99UazA91yFDtjwZwKIhu0";
  if (JWT != null) {
    config.headers.auth = JWT;
  }

  console.log("jdasd", config);

  return config;
});

export default api;
