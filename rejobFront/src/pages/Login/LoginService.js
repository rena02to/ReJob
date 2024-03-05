import api from "../../services/api";

class LoginService {
  async login(email, password) {
    try {
      const response = await api.post(`/auth/authenticate`, {
        email,
        password,
      });

      const token = response.data;

      localStorage.setItem("token", token.token);

      return response.data;
    } catch (error) {
      console.error("Login faileda:", error);
      throw error;
    }
  }

  async register(name, email, password) {
    try {
      const response = await api.post(`/auth/register`, {
        name,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }
}

// eslint-disable-next-line
export default new LoginService();
