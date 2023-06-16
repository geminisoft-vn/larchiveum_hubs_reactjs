import { lazy } from "react";

// home
const HomePage = lazy(() => import("./home/Home"));
const ProfilePage = lazy(() => import("./home/Profile"));
const QuizFormPage = lazy(() => import("./home/QuizForm"));
const DocumentFormPage = lazy(() => import("./home/DocumentForm"));
const RoomFormPage = lazy(() => import("./home/RoomForm"));
const UserManagamentPage = lazy(() => import("./home/UserManagement"));
const ContentPage = lazy(() => import("./home/ContentManagement"));
const RoomManagementPage = lazy(() => import("./home/RoomManagement"));

// auth
const LoginPage = lazy(() => import("./auth/Login"));
const RegistrationPage = lazy(() => import("./auth/Registration"));
const VerifyPage = lazy(() => import("./auth/Verification"));
const ForgotPasswordPage = lazy(() => import("./auth/ForgotPassword"));
const OAuthRedirectPage = lazy(() => import("./auth/OAuthRedirect"));
const ConfirmationPage = lazy(() => import("./auth/Confirmation"));
const ResetPasswordPage = lazy(() => import("./auth/ResetPassword"));

export {
  HomePage,
  LoginPage,
  RegistrationPage,
  ContentPage,
  RoomManagementPage,
  ForgotPasswordPage,
  ProfilePage,
  QuizFormPage,
  DocumentFormPage,
  RoomFormPage,
  UserManagamentPage,
  VerifyPage,
  OAuthRedirectPage,
  ConfirmationPage,
  ResetPasswordPage
};
