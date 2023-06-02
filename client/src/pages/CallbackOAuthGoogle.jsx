import React, { useEffect } from "react";

import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const CallbackOAuthGoogle = () => {
  const { search } = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_ROOT}/v1/auth/google/callback?${search}`)
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((user) => {
        if (user) {
          Cookies.set("__LARCHIVEUM__COOKIES", user.jwt);
          navigate("/home/app");
        }
      });
  }, [search]);

  return <div />;
};

export default CallbackOAuthGoogle;
