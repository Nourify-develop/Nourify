import axios from "./axios";


const RegisterUrl = "api/auth/register"
interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    agreeToTerms: boolean;
  }

export const registerUser = async (userData:RegisterPayload)=>{
    try {
        const response = await axios.post(RegisterUrl,userData)
        return response.data
    } catch (error: unknown) {
        
      
        throw error;
    }
}