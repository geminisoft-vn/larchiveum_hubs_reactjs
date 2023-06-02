import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const CallbackOAuthGoogle = () => {
  const { search } = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_ROOT}/v1/auth/${
        params.providerName
      }/callback${search}`
    )
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(user => {
        if (user) {
          Cookies.set("__LARCHIVEUM__COOKIES", user.jwt);
          navigate("/home/app");
        }
      });
  }, []);

  return <div />;
};

export default CallbackOAuthGoogle;
