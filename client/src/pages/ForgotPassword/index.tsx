import { ErrorOption, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import UserService from "src/api/UserService";
import {
	Alert,
	Box,
	Button,
	FormContainer,
	FormItem,
	Stack,
	TextInput,
	Typography,
} from "src/components";

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
		UserService.requestResetPassword(data).then((res) => {
			if (res.result === "ok") {
				// setIsOpenPoupEmailSentNotification(true);
				navigate("/auth/signin");
			} else if (res.result === "fail") {
				setError("email", {
					type: res.code,
					message: t(
						`forgot_password.FORGOT_PASSWORD_ERROR__${res.error.toUpperCase()}`,
					),
				});
			}
		});
	});

	console.log({ errors });

	return (
		<div className="bg-white p-16 rounded-lg border">
			<Stack direction="col" alignItems="center" gap={4}>
				<Typography className="text-center font-bold text-lg">
					{t("forgot_password.FORGOT_PASSWORD")}
				</Typography>
				<Box>
					{errors.email && <Alert type="error" error={errors.email.message} />}
				</Box>

				<FormContainer
					onSubmit={handleRetrievePassword}
					className="flex flex-col gap-2"
				>
					<FormItem
						label={t("signin.EMAIL_LABEL")}
						renderInput={() => <TextInput {...register("email")} />}
					/>

					<Button type="submit">{t("forgot_password.SEND_BUTTON")}</Button>
				</FormContainer>

				<Link to="/auth/signin" className="text-center">
					Sign in
				</Link>
			</Stack>
		</div>
	);
};

export default ForgotPasswordPage;
