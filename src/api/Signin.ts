//auth/signin

import { toast } from "sonner";
import axios from "./axios";

const SignUrl = "/api/auth/signin";
interface SigninPayLoad {
  email: string;
  password: string;
}

export const signinUser = async (userData: SigninPayLoad) => {
  try {
    const response = await axios.post(SignUrl, userData);
    console.log("Response:", response.data);
    return response.data; // This will be processed in `handleLogin`
  } catch (error: any) {
    console.error("Signin error:", error);
    toast.error(error.response?.data?.message || "Login request failed");
    // throw new Error(error.response?.data?.message || "Login request failed");
  }
};