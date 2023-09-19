import { Navigate, useRoutes } from "react-router-dom";

// layouts
import AuthLayout from "src/layouts/AuthLayout";
import MainLayout from "src/layouts/MainLayout";
// pages
import {
  ConfirmationPage,
  ContentPage,
  DocumentFormPage,
  DocumentViewerPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  OAuthRedirectPage,
  ProfilePage,
  QuizFormPage,
  QuizGamePage,
  RegistrationPage,
  ResetPasswordPage,
  RoomFormPage,
  RoomManagementPage,
  UserManagamentPage,
  VerifyPage,
} from "src/pages";
import { USER_TYPE_ENUM } from "./utils/constant";
import { useAuth } from "./hooks";
import SystemPage from "./pages/home/SystemManagement";

// ----------------------------------------------------------------------

export default function Router() {
  const { user } = useAuth();

  const generateRouteElement = (path, element, roleRequired) => {
    if (roleRequired && user?.type !== roleRequired) {
      return <Navigate to="/home" />;
    }
    return element;
  };

  const routes = useRoutes([
    {
      path: "/home",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/home/app" />, index: true },
        { path: "app", element: <HomePage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "room", element: <RoomManagementPage /> },
        { path: "room-form", element: <RoomFormPage /> },
        { path: "room-form/:id", element: <RoomFormPage /> },
        { path: "content", element: <ContentPage /> },
        { path: "quiz-form", element: <QuizFormPage /> },
        { path: "quiz-form/:id", element: <QuizFormPage /> },
        { path: "document-form", element: <DocumentFormPage /> },
        { path: "document-form/:id", element: <DocumentFormPage /> },
        { path: "system", element: <SystemPage /> },
        {
          path: "user",
          element: generateRouteElement(
            "user",
            <UserManagamentPage />,
            USER_TYPE_ENUM.HUBS_ADMIN
          ),
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          element: <Navigate to="/auth/signin" />,
          index: true,
        },
        { path: "signin", element: <LoginPage /> },
        { path: "signup", element: <RegistrationPage /> },
        { path: "forgot-password", element: <ForgotPasswordPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
        { path: "confirmation", element: <ConfirmationPage /> },
        { path: "verify", element: <VerifyPage /> },
        { path: "oauth/redirect", element: <OAuthRedirectPage /> },
      ],
    },
    { path: "/quiz-game/:id", element: <QuizGamePage /> },
    { path: "/document-viewer/:id", element: <DocumentViewerPage /> },
    { path: "*", element: <Navigate to="/home/app" replace /> },
  ]);

  return routes;
}
