"use client"; // Add this at the very top

import axios from "@/api/axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";

// Define the type for your user data
interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  uid: string;
  image?: string;
  token?: string;
}

interface AuthContextProps {
  user: UserData | null;
  setUser: (userData: UserData | null) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const getCookie = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  const getUserData = async () => {
    try {
      const userId = getCookie("NOURIFY_ID");
      const token = getCookie("NOURIFY_TOKEN");

      if (!userId || !token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User Data:", response.data);
      setUser(response.data.data);
    } catch (error: any) {
      console.error(
        "Error fetching user data:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Login request failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const logout = () => {
    console.log("Logging out user:", user);
    setUser(null);
    document.cookie =
      "NOURIFY_ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie =
      "NOURIFY_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    console.log("User logged out and localStorage cleared.");
  };

  const updateUser = (userData: UserData | null) => {
    setUser(userData);
    if (userData) {
      console.log("User data set:", userData);
    } else {
      console.log("User data cleared.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};