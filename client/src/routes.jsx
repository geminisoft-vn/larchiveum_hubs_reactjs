import { Navigate, useRoutes } from "react-router-dom";

// layouts
import AuthLayout from "src/layouts/AuthLayout";
import MainLayout from "src/layouts/MainLayout";
import ProtectedRoute from "src/layouts/ProtectedRoute";
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
  VerifyPage
} from "src/pages";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/home",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/home/app" />, index: true },
        { path: "app", element: <HomePage /> },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          )
        },
        {
          path: "room",
          element: (
            <ProtectedRoute>
              <RoomManagementPage />
            </ProtectedRoute>
          )
        },
        {
          path: "room-form",
          element: (
            <ProtectedRoute>
              <RoomFormPage />
            </ProtectedRoute>
          )
        },
        {
          path: "room-form/:id",
          element: (
            <ProtectedRoute>
              <RoomFormPage />
            </ProtectedRoute>
          )
        },
        {
          path: "content",
          element: (
            <ProtectedRoute>
              <ContentPage />
            </ProtectedRoute>
          )
        },
        {
          path: "quiz-form",
          element: <QuizFormPage />
        },
        {
          path: "quiz-form/:id",
          element: <QuizFormPage />
        },
        {
          path: "document-form",
          element: <DocumentFormPage />
        },
        {
          path: "document-form/:id",
          element: <DocumentFormPage />
        },
        {
          path: "user",
          element: (
            <ProtectedRoute>
              <UserManagamentPage />
            </ProtectedRoute>
          )
        }
      ]
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          element: <Navigate to="/auth/signin" />,
          index: true
        },
        {
          path: "signin",
          element: <LoginPage />
        },
        {
          path: "signup",
          element: <RegistrationPage />
        },
        {
          path: "forgot-password",
          element: <ForgotPasswordPage />
        },
        {
          path: "reset-password",
          element: <ResetPasswordPage />
        },
        {
          path: "confirmation",
          element: <ConfirmationPage />
        },
        {
          path: "verify",
          element: <VerifyPage />
        },
        {
          path: "oauth/redirect",
          element: <OAuthRedirectPage />
        }
      ]
    },
    {
      path: "/quiz-game/:id",
      element: <QuizGamePage />
    },
    {
      path: "/document-viewer/:id",
      element: <DocumentViewerPage />
    },

    {
      path: "*",
      element: <Navigate to="/home/app" replace />
    }
  ]);

  return routes;
}
