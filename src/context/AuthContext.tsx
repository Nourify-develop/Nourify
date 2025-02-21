"use client";  // Add this at the very top

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
}

// Initialize the context with default values
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUser(parsedUserData);
      console.log("Loaded user data from localStorage:", parsedUserData);
    }
  }, []);

  // Function to log out the user
  const logout = () => {
    console.log("Logging out user:", user);
    setUser(null);
    localStorage.removeItem("userData");
    console.log("User logged out and localStorage cleared.");
  };

  // Set the user data and log the change
  const updateUser = (userData: UserData | null) => {
    setUser(userData);
    if (userData) {
      console.log("User data set:", userData);
    } else {
      console.log("User data cleared.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser, logout }}>
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
