import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import logo from "src/assets/images/larchiveum_logo.png";
import {
	Alert,
	Button,
	FormContainer,
	FormItem,
	SigninSocialButton,
	Stack,
	TextInput,
} from "src/components";
import { getLanguage, setLanguage } from "src/language";
import UserService from "src/utilities/apiServices/UserService";
import Store from "src/utilities/store";

const SignIn = () => {
	const { t } = useTranslation();

	const {
		handleSubmit,
		register,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		setLanguage(getLanguage());
	}, []);

	// const handleSubmit = (e) => {
	// 	// e.preventDefault();
	// 	// UserService.login(data).then((res) => {
	// 	// 	if (res.result === "ok") {
	// 	// 		Store.setUser(res.data);
	// 	// 		window.location = `/`;
	// 	// 	} else if (res.result === "fail") {
	// 	// 		setError(
	// 	// 			t(
	// 	// 				`forgot_password.FORGOT_PASSWORD_ERROR__${res.error.toUpperCase()}`,
	// 	// 			),
	// 	// 		);
	// 	// 	}
	// 	// });
	// };

	const handleLogin = handleSubmit((data) => {});

	const handleChangeLanguage = (event) => {
		// const lang = event.target.value;
		// setLanguage(lang);
		// setLanguage(lang);
	};

	return (
		<div
			className="w-full h-full flex items-center justify-center"
			style={{
				backgroundImage: `url(https://hubs-dev-01-assets.larchiveum.link/hubs/assets/login/background-da651ea8f8f4db5bec199e614ba84843.jpg)`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
		>
			<Stack
				direction="col"
				alignItems="center"
				gap={2}
				className="bg-white p-16 shadow-lg border rounded-lg "
			>
				<Alert type="error" message={errors.email} />
				<Alert type="error" message={errors.password} />
				<Stack direction="row" justfyContent="center">
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
				<FormContainer onSubmit={handleLogin} className="flex flex-col  gap-2">
					<FormItem
						label={t("signin.EMAIL_LABEL")}
						renderInput={() => (
							<TextInput {...register("email")} placeholder="" className="" />
						)}
					/>
					<FormItem
						label={t("signin.PASSWORD_LABEL")}
						renderInput={() => (
							<TextInput
								{...register("password")}
								placeholder=""
								className=""
							/>
						)}
					/>

					<Button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-df w-full sm:w-auto px-5 py-2.5"
					>
						{t("signin.SIGN_IN_BUTTON")}
					</Button>
				</FormContainer>

				<p>
					Or register at <a href="/signup">Sign up</a>
				</p>

				<SigninSocialButton />

				<p>
					If you forgot your password{" "}
					<a href="/forgot_password">Reset password</a>
				</p>
			</Stack>
			{/* <Paper
					elevation={4}
					sx={{ p: 2, width: "512px" }}
					component="form"
					// onSubmit={handleSubmit}
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
				</Paper> */}
		</div>
	);
};

export default SignIn;
