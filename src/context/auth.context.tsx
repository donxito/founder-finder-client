import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = React.createContext({
  authenticateUser: () => {},
  user: null,
  loading: false,
  isLoggedIn: false,
  logOutUser: () => {},
  storeToken: (token: string) => {
    localStorage.setItem("authToken", token);
  },
});

const AuthProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storeToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    console.log("Stored token:", storedToken);

    if (storedToken) {
      authService
        .verify()
        .then((response) => {
          console.log("Verify response:", response);
          setUser(response.data);
          setIsLoggedIn(true);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Token verification failed:", error);
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

export { AuthProviderWrapper, AuthContext };
