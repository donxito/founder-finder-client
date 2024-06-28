/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import authService from "../services/auth.service";
import { UserType } from "../types/userType";

// Define the shape of the AuthContext
interface AuthContextType {
  authenticateUser: () => void;
  user: UserType | null;
  loading: boolean;
  isLoggedIn: boolean;
  logOutUser: () => void;
  storeToken: (token: string) => void;
}

// Initialize the context with default values
const AuthContext = createContext<AuthContextType>({
  authenticateUser: () => {},
  user: null,
  loading: false,
  isLoggedIn: false,
  logOutUser: () => {},
  storeToken: (token: string) => {
    localStorage.setItem("authToken", token);
  },
});

// Define the AuthProviderWrapper component
const AuthProviderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storeToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      authService
        .verify()
        .then((response) => {
          setUser(response.data);
          setIsLoggedIn(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error)
          setIsLoggedIn(false);
          setUser(null);
          setLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setLoading(false);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        user,
        loading,
        isLoggedIn,
        logOutUser,
        storeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook for easy access to the AuthContext
const useAuth = () => useContext(AuthContext);

export { AuthProviderWrapper, useAuth, AuthContext };
