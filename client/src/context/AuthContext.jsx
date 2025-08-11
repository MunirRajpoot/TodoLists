import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api"; // axios instance with baseURL
import SHA256 from "crypto-js/sha256";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (token) {
          const { data } = await api.get("/auth/validate", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data.user);
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    validateToken();
  }, []);

  const register = async (userData) => {
    try {
      const hashedPassword = SHA256(userData.password).toString();
      const { data } = await api.post("/auth/register", {
        ...userData,
        password: hashedPassword,
      });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);

      toast.success("Account created successfully!");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const hashedPassword = SHA256(credentials.password).toString();
      const { data } = await api.post("/auth/login", {
        ...credentials,
        password: hashedPassword,
      });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);

      toast.success("Logged in successfully!");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, register, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);