import axios, { AxiosHeaders, AxiosInstance } from "axios";

class AuthService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` } as unknown as AxiosHeaders;
      }

      return config;
    });
  }

  isLoggedIn() {
    const authToken = localStorage.getItem("authToken");
    return !!authToken;
  }

  login = (requestBody: { email: string; password: string }) => {
    const payload = {
      email: requestBody.email,
      password: requestBody.password,
    };
    return this.api.post("/auth/login", payload).then((response) => {
      const authToken = response.data.authToken;
      localStorage.setItem("authToken", authToken);
      return response;
    });
  };

  signup = (requestBody: {
    email: string;
    password: string;
    name: string;
    about?: string;
    phoneNumber?: string;
  }) => {
    return this.api.post("/auth/signup", requestBody).then((response) => {
      return response;
    });
  };

  verify = () => {
    return this.api.get("/auth/verify");
  };

  logout = () => {
    localStorage.removeItem("authToken");
  };

  storeToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  googleLogin = () => {
    window.location.href = `${this.api.defaults.baseURL}/auth/google`;
  };
}

const authService = new AuthService();
export default authService;
