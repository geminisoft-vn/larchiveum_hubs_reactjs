import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useSWR from "swr";

import { AuthService } from "src/services";
import request from "src/utils/request";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: user, mutate } = useSWR(
    Cookies.get("__LARCHIVEUM__COOKIES") && pathname.includes("home")
      ? "/users/me?populate=*"
      : null,
    url => {
      return request
        .get(url, {
          headers: {
            Authorization: `Bearer ${Cookies.get("__LARCHIVEUM__COOKIES")}`
          }
        })
        .then(res => {
          if (res.status === 200) {
            return res.data;
          }
          return null;
        });
    }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const signIn = useCallback(async (email, password) => {
    setIsLoading(true);
    const res = await AuthService.login(email, password);
    Cookies.set("__LARCHIVEUM__COOKIES", res.data.jwt);
    setIsLoading(false);
    mutate();
    navigate("/home/app");
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    const res = await AuthService.oAuthGoogle();
  }, []);

  const signUp = useCallback(async (username, email, password) => {
    setIsLoading(true);
    await AuthService.register(username, email, password);
    setIsLoading(false);
    navigate("/auth/signin");
  }, []);

  const signOut = useCallback(() => {
    Cookies.remove("__LARCHIVEUM__COOKIES");
    navigate("/home/app");
    window.open(`${import.meta.env.VITE_APP_ROOT}?action=signout`, "_blank");
  }, []);

  const memoedValue = useMemo(
    () => ({
      signIn,
      signInWithGoogle,
      signOut,
      signUp,
      isLoading,
      user
    }),
    [user, isLoading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
