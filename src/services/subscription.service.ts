import axios, { AxiosInstance } from "axios";

class SubscriptionService {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
        });
    }

    // Define subscribe method 
    subscribe = async (email: string) => {
        try {
            const response = await this.api.post("/subscribe", { email });
            return response.data; // Return response data if needed
        } catch (error) {
            // Handle error if necessary
            console.error("Error subscribing:", error);
            throw error; // Throw error for handling in caller
        }
    };
}

const subscriptionService = new SubscriptionService();

export default subscriptionService;
