/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosInstance } from "axios";

type AdRequestBody = {
  businessIdea: string;
  description: string;
  investment: string;
  location: string;
  posterName: string;
  posterInfo: {
    name: string;
    about: string;
    email: string;
    phone: number;
  };
  requiredSkills: string[]; 
  category: string;
};


class AdService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });
  }

  // POST /ads
  createAd = (requestBody: AdRequestBody) => {
    return  this.api.post("/ads", requestBody);
  };

  // GET /ads
  getAllAds = () => {
    return  this.api.get("/ads");
  };

  // GET /ads/:adId
  getAd = (adId: string) => {
    return  this.api.get(`/ads/${adId}`);
  };

  // PUT /ads/:adId
  updateAd = (adId: string, requestBody: AdRequestBody) => {
    return  this.api.put(`/ads/${adId}`, requestBody);
  };

  // DELETE /ads/:adId
  deleteAd = (adId: string) => {
    return  this.api.delete(`/ads/${adId}`);
  };

  // GET/users/ads/:userId
  getUserAds = (userId: string) => {
    return  this.api.get(`/users/ads/${userId}`);
  };

}

const adService = new AdService();

export default adService;
