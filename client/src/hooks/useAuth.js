import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = cookies.jwt;
    if (token) {
      setUser({ token });
    }
  }, [cookies.jwt]);

  const login = (user) => {
    setUser(user);
    setCookie("jwt", user.token, { path: "/" });
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    removeCookie("jwt", { path: "/" });
    // document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
