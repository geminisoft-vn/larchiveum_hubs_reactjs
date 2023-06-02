import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const SigninPage = lazy(() => import("./SigninPage"));
const SignupPage = lazy(() => import("./SignupPage"));
const VerifyPage = lazy(() => import("./VerifyPage"));
const ContentPage = lazy(() => import("./ContentPage"));
const RoomPage = lazy(() => import("./RoomPage"));
const ForgotPasswordPage = lazy(() => import("./ForgotPasswordPage"));
// const ResetPasswordPage = lazy(() => import("./ResetPasswordPage"));
const ProfilePage = lazy(() => import("./ProfilePage"));
const QuizFormPage = lazy(() => import("./QuizFormPage"));
const DocumentFormPage = lazy(() => import("./DocumentFormPage"));
const RoomFormPage = lazy(() => import("./RoomFormPage"));
const UserPage = lazy(() => import("./UserPage"));
const ConfirmationPage = lazy(() => import("./ConfirmationPage"));
// const QuizPreviewPage = lazy(() => import("./QuizPreview"));
// const DocumentPreviewPage = lazy(() => import("./DocumentPreview"));
const OAuthRedirect = lazy(() => import("./OAuthRedirect"));

export {
  HomePage,
  SigninPage,
  SignupPage,
  ContentPage,
  RoomPage,
  ForgotPasswordPage,
  ProfilePage,
  QuizFormPage,
  DocumentFormPage,
  RoomFormPage,
  UserPage,
  VerifyPage,
  OAuthRedirect,
  ConfirmationPage
};
