import { lazy } from "react";

const HomePage = lazy(() => import("./Home"));
const SigninPage = lazy(() => import("./SignIn"));
const SignupPage = lazy(() => import("./SignUp"));
const WarningVerifyPage = lazy(() => import("./WarningVerify"));
const ContentPage = lazy(() => import("./Content"));
const ManagerPage = lazy(() => import("./Manager"));
const ForgotPasswordPage = lazy(() => import("./ForgotPassword"));
const ResetPasswordPage = lazy(() => import("./ResetPassword"));
const ProfilePage = lazy(() => import("./Profile"));
const CallbackNaverOAuthPage = lazy(() => import("./CallbackNaverOAuth"));
const ViewQuizPage = lazy(() => import("./ViewQuiz"));
const QuizManagementPage = lazy(() => import("./QuizManagement"));
const QuizFormPage = lazy(() => import("./QuizForm"));
const DocumentManagementPage = lazy(() => import("./DocumentManagement"));
const DocumentFormPage = lazy(() => import("./DocumentForm"));
const UserManagementPage = lazy(() => import("./UserManagement"));

export {
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
	ViewQuizPage,
	QuizManagementPage,
	QuizFormPage,
	DocumentManagementPage,
	DocumentFormPage,
	UserManagementPage,
};
