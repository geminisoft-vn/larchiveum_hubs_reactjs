import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthService } from "src/services";

const CallbackOAuthGoogle = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const checkToken = () => {
    const token = searchParams.get("token");
    if (token) {
      AuthService.checkToken(token).then(res => {
        if (res.status === 200) {
          Cookies.set("__LARCHIVEUM__COOKIES", token);
          navigate("/home/app");
        } else {
          navigate("/auth/signin");
        }
      });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return <div />;
};

export default CallbackOAuthGoogle;
