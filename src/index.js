/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";

import "./react-components/styles/global.scss";

import registerTelemetry from "./telemetry";
import Store from "./storage/store";
import "./utils/theme";

import {
  HomePage,
  SigninPage,
  SignupPage,
  WarningVerifyPage,
  ContentPage,
  ManagerPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  CallbackNaverOAuthPage,
  ViewQuizPage
} from "src/@larchiveum/pages";

registerTelemetry("/home", "Hubs Home Page");

const store = new Store();
window.APP = { store };

const getPage = () => {
  return new URL(location.href).searchParams.get("page");
};

function Root() {
  const page = getPage();
  switch (page) {
    case "home":
      return <HomePage />;

    case "signin":
      return <SigninPage />;

    case "signup":
      return <SignupPage />;
    case "warning-verify":
      return <WarningVerifyPage />;

    case "content":
      return <ContentPage />;

    case "manager":
      return <ManagerPage />;

    case "forgot-password":
      return <ForgotPasswordPage />;

    case "reset-password":
      return <ResetPasswordPage />;

    case "profile":
      return <ProfilePage props={{ avarar: "Avt", name: "Name" }} />;

    case "callback-naver-oauth":
      return <CallbackNaverOAuthPage />;

    case "view-quiz":
      return <ViewQuizPage />;

    default:
      return <HomePage />;
  }
}

ReactDOM.render(<Root />, document.getElementById("home-root"));
