import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = async ({ email, password }) => {
    try {
      if (!email || !password) {
        throw new Error("Faltan datos");
      }

      setToken("token-falso-123");
      setEmail(email);

    } catch (err) {
      console.error("Login fallido:", err.message);
    }
  };

  const register = async ({ email, password }) => {
    try {
      if (!email || !password) {
        throw new Error("Faltan datos");
      }

      setToken("token-falso-456");
      setEmail(email);

    } catch (err) {
      console.error("Registro fallido:", err.message);
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setProfile(null);
  };

  const getProfile = async () => {
    if (!token) return;

    setProfile({
      email,
      rol: "usuario",
      lenguaje: "JavaScript"
    });
  };

  return (
    <UserContext.Provider
      value={{ token, email, profile, login, register, logout, getProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};
