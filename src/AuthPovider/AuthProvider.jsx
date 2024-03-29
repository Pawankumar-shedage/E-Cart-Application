/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("userToken") || ""
  );

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("userToken", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("userToken");
  };

  return (
    <>
      <AuthContext.Provider value={{ token, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
