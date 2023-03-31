import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Box,
	Container,
	Divider,
	IconButton,
	Paper,
	Stack,
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
	const user = Store.getUser();
	const { t } = useTranslation();

	const [email, setEmail] = useState(null);
	const [submitted, setSubmited] = useState(false);
	const [isOpenPoupEmailSentNotification, setIsOpenPoupEmailSentNotification] =
		useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLanguage(getLanguage());
	}, []);

	const handleChangeEmail = (e) => {
		const { value } = e.target;
		setEmail(value);
		setError();
	};

	const handleChangeLanguage = (event) => {
		const lang = event.target.value;
		setLanguage(lang);
		setLanguage(lang);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmited(true);

		const data = { email };
		UserService.requestResetPassword(data).then((res) => {
			if (res.result === "ok") {
				setIsOpenPoupEmailSentNotification(true);
			} else if (res.result === "fail") {
				setError(t(`signup.SIGN_UP_ERROR__${res.error.toUpperCase()}`));
				setError(res.error);
			}
		});
	};

	return (
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

					<Button
						type="submit"
						variant="contained"
						fullWidth
						sx={{
							background: `linear-gradient(45deg, #00dbde, #fc00ff) !important`,
						}}
					>
						{t("forgot_password.SEND_BUTTON")}
					</Button>
				</Stack>

				<Typography sx={{ textAlign: "center" }}>
					<a href="/?page=signin">Sign in</a>
				</Typography>
			</Stack>
		</Paper>
	);
};

export default ForgotPasswordPage;
