import axios, { AxiosInstance } from "axios";
import { UserType } from "../types/userType";

class UserService {
  api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });
  }
  // GET /user/:userId
  getUser = (userId: string) => {
    return this.api.get(`/users/${userId}`);
  };
  // PUT /user/:userId
  updateUser = (userId: string, requestBody: Partial<UserType>) => {
    return this.api.put(`/users/${userId}`, requestBody as object);
  };
  // DELETE /user/:userId
  deleteUser = (userId: string) => {
    return this.api.delete(`/users/${userId}`);
  };

  // POST /upload
  uploadImage = (file: FormData) => {
    return this.api.post("/upload", file);
  };
}
const userService = new UserService();
export default userService;
