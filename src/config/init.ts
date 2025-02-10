import axios from "axios";
import { toast } from "sonner";

export default function initApiClient() {
  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
    },
  });

  apiClient.interceptors.request.use(
    (config) => {
      try {
        const cookies = document.cookie.split("; ");
        const authToken = cookies.find((cookie) =>
          cookie.startsWith("nourify_auth_token=")
        );
        if (authToken) {
          const token = authToken.split("=")[1];
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error parsing token from cookies:", error);
      }
      return config;
    },
    (error) => {
      toast.error("Request error: " + error.message);
      return Promise.reject(error);
    }
  );

  // Handle response errors globally
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Show toast notification for unauthorized access
        toast.error("Unauthorized access. Redirecting to login...");
        // Redirect to login if unauthorized
        window.location.href = "/login";
      } else {
        toast.error("Response error: " + error.message);
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
}
