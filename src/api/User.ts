import axios from "./axios";
import { toast } from "sonner";

export const getUserData = async () => {
  const getCookie = (name: any) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };
  try {
    const userId = getCookie("NOURIFY_ID");
    const token = getCookie("NOURIFY_TOKEN");
    const response = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("User Data:", response.data);
    return response.data;
  } catch (error:any) {
    console.error("Error fetching user data:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Login request failed");

  }
};

getUserData();
