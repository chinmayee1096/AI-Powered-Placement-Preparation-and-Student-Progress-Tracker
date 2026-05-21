import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("placement_user") || "null"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("placement_token");
    if (!token) return;
    api.get("/auth/me")
      .then(({ data }) => setUser(data.user))
      .catch(() => logout());
  }, []);

  const persist = (payload) => {
    localStorage.setItem("placement_token", payload.token);
    localStorage.setItem("placement_user", JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const login = async (values) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", values);
      persist(data);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (values) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", values);
      persist(data);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("placement_token");
    localStorage.removeItem("placement_user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
