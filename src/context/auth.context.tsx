/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, createContext, ReactNode } from "react";
import authService from "../services/auth.service";

interface AuthContextProps {
  authenticateUser: () => void;
  googleAuthenticateUser: () => void;
  user: any;
  loading: boolean;
  isLoggedIn: boolean;
  isOwner: boolean;
  isAnon: boolean;
  logOutUser: () => void;
  storeToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  authenticateUser: () => {},
  googleAuthenticateUser: () => {},
  user: null,
  loading: false,
  isLoggedIn: false,
  isOwner: false,
  isAnon: false,
  logOutUser: () => {},
  storeToken: (token: string) => {
    localStorage.setItem("authToken", token);
  },
});

interface AuthProviderWrapperProps {
  children: ReactNode;
}

const AuthProviderWrapper: React.FC<AuthProviderWrapperProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isAnon, setIsAnon] = useState(false);

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
          setIsLoggedIn(false);
          setUser(null);
          setLoading(false);
          console.error("Token verification failed:", error);
        });
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setLoading(false);
    }
  };

  const googleAuthenticateUser = () => {
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
          setIsLoggedIn(false);
          setUser(null);
          setLoading(false);
          console.error("Token verification failed:", error);
        });
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
        googleAuthenticateUser,
        user,
        loading,
        isLoggedIn,
        isOwner,
        isAnon,
        logOutUser,
        storeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProviderWrapper, AuthContext };
