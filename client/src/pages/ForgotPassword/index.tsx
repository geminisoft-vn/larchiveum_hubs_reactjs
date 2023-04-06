import { ErrorOption, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import UserService from "src/api/UserService";
import logo from "src/assets/images/larchiveum_logo.png";
import {
	Alert,
	Button,
	FormContainer,
	FormItem,
	SigninSocialButton,
	Stack,
	TextInput,
	Typography,
} from "src/components";
import { getLanguage, setLanguage } from "src/language";
import Store from "src/utilities/store";

// import Popup from "../../../../react-components/popup/popup";
import "reactjs-popup/dist/index.css";

const ForgotPasswordPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const {
		handleSubmit,
		register,
		formState: { errors },
		setError,
	} = useForm<{ email: string }>({
		defaultValues: { email: "" },
	});

	const handleRetrievePassword = handleSubmit((data) => {
		UserService.requestResetPassword(data)
			.then((res) => {
				if (res.result === "ok") {
					navigate("/auth/signin");
				}
			})
			.catch((error) => {
				if (error.response) {
					setError("email", {
						type: error.response.data.error,
						message: t(
							`forgot_password.FORGOT_PASSWORD_ERROR__${error.response.data.error.toUpperCase()}`,
						),
					});
				}
			});
	});

	return (
		<Stack
			direction="col"
			gap={2}
			className="rounded-lg border bg-white p-16 shadow-lg"
		>
			<FormContainer
				onSubmit={handleRetrievePassword}
				className="flex flex-col items-center gap-2"
			>
				<Stack direction="col" justifyContent="start" gap={4}>
					<Typography className="text-center text-lg font-bold">
						{t("forgot_password.FORGOT_PASSWORD")}
					</Typography>
					<Stack direction="col" gap={2}>
						<>
							{errors.email && (
								<Alert type="error" error={errors.email.message} />
							)}
						</>
						<FormItem
							label={t("signin.EMAIL_LABEL")}
							renderInput={() => {
								return <TextInput {...register("email")} />;
							}}
						/>
					</Stack>
				</Stack>

				<Button type="submit">{t("forgot_password.SEND_BUTTON")}</Button>
			</FormContainer>

			<Link to="/auth/signin" className="text-center">
				Sign in
			</Link>
		</Stack>
	);
};

export default ForgotPasswordPage;
