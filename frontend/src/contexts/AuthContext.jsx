import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../services/auth.service";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Provider do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (email, password) => {
    const data = await AuthService.login(email, password);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);

    localStorage.setItem("token", data.AccessToken);
    setToken(data.AccessToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);

    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};