import { Navigate, useRoutes } from "react-router-dom";

// layouts
import AuthLayout from "src/layouts/AuthLayout";
import MainLayout from "src/layouts/MainLayout";
import PreviewLayout from "src/layouts/PreviewLayout";
import ProtectedRoute from "src/layouts/ProtectedRoute";
// pages
import {
	// CallbackNaverOAuthPage,
	ContentPage,
	DocumentFormPage,
	DocumentManagementPage,
	ForgotPasswordPage,
	HomePage,
	ManagerPage,
	ProfilePage,
	QuizFormPage,
	QuizManagementPage,
	QuizPreviewPage,
	ResetPasswordPage,
	SigninPage,
	SignupPage,
	UserManagementPage,
	WarningVerifyPage,
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
					),
				},
				{
					path: "manager",
					element: (
						<ProtectedRoute>
							<ManagerPage />
						</ProtectedRoute>
					),
				},
				{
					path: "content",
					element: (
						<ProtectedRoute>
							<ContentPage />
						</ProtectedRoute>
					),

					children: [
						{
							element: <Navigate to="/home/content/quiz/management" />,
							index: true,
						},
						{
							path: "quiz/management",
							element: <QuizManagementPage />,
						},
						{
							path: "quiz/form",
							element: <QuizFormPage />,
						},
						{
							path: "quiz/form/:quizId",
							element: <QuizFormPage />,
						},
						{
							path: "document/management",
							element: <DocumentManagementPage />,
						},
						{
							path: "document/form",
							element: <DocumentFormPage />,
						},
						{
							path: "document/form/:documentId",
							element: <DocumentFormPage />,
						},
					],
				},
				{
					path: "users",
					element: (
						<ProtectedRoute>
							<UserManagementPage />
						</ProtectedRoute>
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
				{
					path: "signin",
					element: <SigninPage />,
				},
				{
					path: "signup",
					element: <SignupPage />,
				},
				{
					path: "forgot_password",
					element: <ForgotPasswordPage />,
				},
				{
					path: "reset_password",
					element: <ResetPasswordPage />,
				},
				{
					path: "warning_verify",
					element: <WarningVerifyPage />,
				},
			],
		},
		{
			path: "/preview",
			element: <PreviewLayout />,
			children: [
				{
					path: "quiz/:id",
					element: <QuizPreviewPage />,
				},
				// {
				// 	path: "document/:id",
				// },
			],
		},
		{
			path: "*",
			element: <Navigate to="/home/app" replace />,
		},
	]);

	return routes;
}
