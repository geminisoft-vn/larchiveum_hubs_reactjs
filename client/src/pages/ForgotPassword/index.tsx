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
} from "@mui/material";

import UserService from "src/api/UserService";
import logo from "src/assets/images/larchiveum_logo.png";
import { Alert, Button, SigninSocialButton, TextInput } from "src/components";
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
		<div
			sx={{
				backgroundImage: `url(https://hubs-dev-01-assets.larchiveum.link/hubs/assets/login/background-da651ea8f8f4db5bec199e614ba84843.jpg)`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",

				width: "100%",
				height: "100%",
			}}
		>
			<Container
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",

					width: "100%",
					height: "100%",
				}}
			>
				<Paper
					elevation={4}
					sx={{ p: 2, width: "512px" }}
					component="form"
					onSubmit={handleSubmit}
				>
					<Stack direction="column" justifyContent="flex-start" spacing={4}>
						<Typography
							component="h5"
							variant="h5"
							sx={{ textAlign: "center", fontWeight: 700 }}
						>
							{t("forgot_password.FORGOT_PASSWORD")}
						</Typography>
						<Stack direction="column" spacing={2}>
							{error && <Alert type="error" message={error} />}
							<TextInput
								name="email"
								label={t("signin.EMAIL_LABEL")}
								fullWidth
								value={email}
								onChange={handleChangeEmail}
							/>

					<Button type="submit">{t("forgot_password.SEND_BUTTON")}</Button>
				</FormContainer>

				<Link to="/auth/signin" className="text-center">
					Sign in
				</Link>
			</Stack>
		</div>
	);
}

export default ForgotPasswordPage;
