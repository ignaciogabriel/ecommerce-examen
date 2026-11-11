import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || null
  );
  const [isLoading, setIsLoading] = useState(false);

  // LOGIN CLIENTE
  const loginClient = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/client/login",
        { email, password }
      );

      setToken(res.data.token);
      setUser(res.data.client);
      setUserType("client");

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
          "user",
          JSON.stringify(res.data.client)
        );
        
      localStorage.setItem("userType", "client");

      return true;
    } catch (error) {
      console.log("LOGIN CLIENT ERROR");
      console.log(error.response);
      console.log(error.response?.data);

      return false;
    }
  };

  // LOGIN ADMIN
  const loginAdmin = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/login",
        { email, password }
      );

      setToken(res.data.token);
      setUserType("admin");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", "admin");

      return true;
    } catch (error) {
      console.log("LOGIN ADMIN ERROR");
      console.log(error.response);
      console.log(error.response?.data);

      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    setUserType(null);
    localStorage.clear();
  };

  // CARGAR PERFIL
  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !userType) return;

      setIsLoading(true);

      try {
        if (userType === "client") {
          const res = await axios.get(
            "http://localhost:3000/api/client/perfil",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setUser(res.data);
        }

        if (userType === "admin") {
          const res = await axios.get(
            "http://localhost:3000/api/admin/perfil",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setUser(res.data);
        }
      } catch (error) {
        console.log("FETCH USER ERROR");
        console.log(error.response);
        console.log(error.response?.data);

         console.log("ME ESTOY DESLOGUEANDO");

        logout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token, userType]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userType,
        isLoading,
        loginClient,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
