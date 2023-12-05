// LoginService.ts
import axios from 'axios'; // You may need to install axios if not already installed

class LoginService {
  // Adjust the API endpoint based on your backend setup
  private apiUrl = 'http://localhost:8080/api/v1/auth';

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/authenticate`, {
        email,
        password,
      });

      // Handle the response or return it as needed
      return response.data;
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Login failed:', error);
      throw error;
    }
  }

  async register(name: string, email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, {
        name,
        email,
        password,
      });

      // Handle the response or return it as needed
      return response.data;
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Registration failed:', error);
      throw error;
    }
  }
}

export default new LoginService();
