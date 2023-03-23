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

function SignIn() {
	const user = Store.getUser();
	const { t } = useTranslation();

	const [data, setData] = useState({});
	const [submitted, setSubmited] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLanguage(getLanguage());
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
		setError();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmited(true);
		UserService.login(data).then((res) => {
			if (res.result === "ok") {
				Store.setUser(res.data);
				window.location = `/`;
			} else if (res.result === "fail") {
				setError(
					t(`forgot_password.FORGOT_PASSWORD_ERROR__${res.error.toUpperCase()}`)
				);
			}
		});
	};

	const handleChangeLanguage = (event) => {
		const lang = event.target.value;
		setLanguage(lang);
		setLanguage(lang);
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
								name="email"
								label={t("signin.EMAIL_LABEL")}
								fullWidth
								value={data.email}
								onChange={handleChange}
							/>

							<TextInput
								name="password"
								type="password"
								label={t("signin.PASSWORD_LABEL")}
								value={data.password}
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
								{t("signin.SIGN_IN_BUTTON")}
							</Button>
						</Stack>

						<Divider>
							Or register at <a href="/?page=signup">Sign up</a>
						</Divider>

						<SigninSocialButton />

						<Typography sx={{ textAlign: "center" }}>
							If you forgot your password{" "}
							<a href="/?page=forgot-password">Reset password</a>
						</Typography>
					</Stack>
				</Paper>
			</Container>
		</Box>
	);
}

export default SignIn;
