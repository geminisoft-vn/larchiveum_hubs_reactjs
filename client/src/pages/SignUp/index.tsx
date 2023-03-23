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

import logo from "src/assets/images/larchiveum_logo.png";
import { Alert, Button, SigninSocialButton, TextInput } from "src/components";
import { getLanguage, setLanguage } from "src/language";
import UserService from "src/utilities/apiServices/UserService";
import Store from "src/utilities/store";

function SignUpForm() {
	const user = Store.getUser();
	const { t } = useTranslation();

	const [data, setData] = useState({});
	const [submitted, setSubmited] = useState(false);
	const [error, setError] = useState(null);
	const [language, setLanguage] = useState("en");

	useEffect(() => {
		setLanguage(getLanguage());
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
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

		if (data.password !== data.repassword) {
			setError(t("signup.SIGN_UP_ERROR__RE_PASSWORD_NOT_MATCH"));
			return;
		}

		UserService.signupWithEmail(data).then((res) => {
			this.setState({ disabled: true });
			if (res.result === "ok") {
				Store.removeUser();
				window.location = `/?page=warning-verify&email=${res.data.email}`;
			} else if (res.result === "fail") {
				setError(t(`signup.SIGN_UP_ERROR__${res.error.toUpperCase()}`));
			}
		});
	};

	return (
		<Box
			sx={{
				backgroundImage: `url(https://hubs-dev-01-assets.larchiveum.link/hubs/assets/login/background-da651ea8f8f4db5bec199e614ba84843.jpg)`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",

				width: "100%",
				height: "100%",
			}}
			component="div"
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
						<Stack
							direction="row"
							justifyContent="center"
							sx={{ width: "100%" }}
						>
							<a href="./">
								<img
									src={logo}
									alt="logo"
									style={{
										width: "256px",
									}}
								/>
							</a>
						</Stack>

						<Stack direction="column" spacing={2}>
							{error && <Alert type="error" message={error} />}
							<TextInput
								name="displayName"
								label={t("signup.DISPLAY_NAME_LABEL")}
								fullWidth
								value={data.displayName}
								onChange={handleChange}
							/>

							<TextInput
								name="email"
								label={t("signup.EMAIL_LABEL")}
								fullWidth
								value={data.email}
								onChange={handleChange}
							/>
							<TextInput
								name="password"
								type="password"
								label={t("signup.PASSWORD_LABEL")}
								value={data.password}
								fullWidth
								onChange={handleChange}
							/>

							<TextInput
								name="repassword"
								type="password"
								label={t("signup.RE_PASSWORD_LABEL")}
								value={data.repassword}
								fullWidth
								onChange={handleChange}
							/>

							<Button
								type="submit"
								variant="contained"
								fullWidth
								sx={{
									background: `linear-gradient(45deg, #00dbde, #fc00ff) !important`,
								}}
							>
								{t("signup.SIGN_UP_BUTTON")}
							</Button>
						</Stack>

						<Typography sx={{ textAlign: "center" }}>
							Already have an account? <a href="/?page=signin">Sign in</a>
						</Typography>
					</Stack>
				</Paper>
			</Container>
		</Box>
	);
}

export default SignUpForm;
