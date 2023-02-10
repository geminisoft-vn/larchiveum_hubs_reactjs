/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import registerTelemetry from "../../telemetry";
import { UserContext } from "./contexts/UserContext";
import { HomePage } from "./pages/Home";
import { SigninPage } from "./pages/SigninPage";
// import { SignupPage } from "./pages/SignupPage";
// import { ContentPage } from "./pages/ContentPage";
// import { ManagerPage } from "./pages/ManagerPage";
// import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
// import { ResetPasswordPage } from "./pages/ResetPasswordPage";
// import { WarningVerifyPage } from "./pages/WarningVerifyPage";
// import { ProfilePage } from "./pages/ProfilePage";
// import { CallbackNaverOAuthPage } from "./pages/CallbackNaverOAuthPage";

registerTelemetry("/", "Larchiveum Home Page");

const getPage = () => {
  return new URL(location.href).searchParams.get("page");
};

function Pages() {
  const page = getPage();
  switch (page) {
    case "home":
      return <HomePage />;

    case "signin":
      return <SigninPage />;

    // case "signup":
    //   return <SignupPage />;
    // case "warning-verify":
    //   return <WarningVerifyPage />;

    // case "content":
    //   return <ContentPage />;

    // case "manager":
    //   return <ManagerPage />;

    // case "forgot-password":
    //   return <ForgotPasswordPage />;

    // case "reset-password":
    //   return <ResetPasswordPage />;

    // case "profile":
    //   return <ProfilePage props={{ avarar: "Avt", name: "Name" }} />;

    // case "callback-naver-oauth":
    //   return <CallbackNaverOAuthPage />;

    default:
      return <HomePage />;
  }
}

export default function Larchiveum() {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Pages />
    </UserContext.Provider>
  );
}
