import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  const login = (userData) => setUser(userData);
  const logout = async () => {
    try {
      await axios.get(`${API}/api/auth/logout`, { withCredentials: true });
      setUser(null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get(`${API}/api/auth/verify`, { withCredentials: true });
        if (data.success) setUser(data.user);
        else setUser(null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default ContextProvider;
