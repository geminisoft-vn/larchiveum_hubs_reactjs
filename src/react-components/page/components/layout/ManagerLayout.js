/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import LocalStorage from "../../utils/store";
import UserService from "../../services/User.service";
import Header from "./Header";
import LoadingPage from "./PageLoading";
import { UserContext } from "../../contexts/UserContext";

import "./ManagerLayput.scss";
import "react-toastify/dist/ReactToastify.css";

export function ManagerLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    const token = LocalStorage.getAccessToken();
    if (token) {
      UserService.checkToken(token)
        .then(res => {
          if (res.result == "ok") {
            setUser(res.data);
          } else {
            LocalStorage.removeAccessToken();
            window.location.href = "/";
          }
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingPage />;
  } else {
    return (
      <div className="_manager_layout">
        <div className="background-homepage">
          <Header />
          <div>{children}</div>
        </div>
      </div>
    );
  }
}
