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
      ? "/auth/users/me"
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
            return res.data.data;
          }
          return null;
        });
    }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const signIn = useCallback((email, password) => {
    setIsLoading(true);
    AuthService.login(email, password)
      .then(res => {
        Cookies.set("__LARCHIVEUM__COOKIES", res.data.jwt);
        mutate();
        navigate("/home/app");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const retrievePassword = useCallback(async email => {
    setIsLoading(true);
    AuthService.requestResetPassword(email)
      .then(res => {
        if (res.status === 200) {
          setIsSuccess(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const resetPassword = useCallback(async (token, password) => {
    setIsLoading(true);
    AuthService.resetPassword(token, password)
      .then(res => {
        if (res.status === 200) {
          navigate("/auth/signin");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const signUp = useCallback(async (username, email, password) => {
    setIsLoading(true);
    AuthService.register(username, email, password)
      .then(res => {
        navigate("/auth/verify");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const signOut = useCallback(
    () => {
      Cookies.remove("__LARCHIVEUM__COOKIES");
      navigate("/home/app");
      if (user && user.type >= 4) {
        window.open(
          `${import.meta.env.VITE_APP_ROOT}?action=signout`,
          "_blank"
        );
      }
    },
    [user]
  );

  const memoedValue = useMemo(
    () => ({
      signIn,
      signOut,
      signUp,
      retrievePassword,
      resetPassword,
      isLoading,
      isSuccess,
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
