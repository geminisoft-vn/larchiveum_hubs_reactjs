import React, { useEffect, useState } from "react";
import { ErrorOption, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import UserService from "src/api/UserService";
import logo from "src/assets/images/larchiveum_logo.png";
import {
	Alert,
	Button,
	FormContainer,
	FormItem,
	Stack,
	TextInput,
	Typography,
} from "src/components";
import { IUserAuthenticationForm } from "src/interfaces";
import { getLanguage, setLanguage } from "src/language";
import Store from "src/utilities/store";

const SignUpForm = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const {
		handleSubmit,
		register,
		setError,
		formState: { errors },
	} = useForm<IUserAuthenticationForm>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		setLanguage(getLanguage());
	}, []);

	const handleSignUp = handleSubmit((data) => {
		if (data.password !== data.repassword) {
			setError(
				"password",
				t("signup.SIGN_UP_ERROR__RE_PASSWORD_NOT_MATCH") as ErrorOption,
			);
			return;
		}

		UserService.signupWithEmail(data).then((res) => {
			if (res.result === "ok") {
				Store.removeUser();
				navigate(`/auth/warning_verify&email=${res.data.email}`);
			} else if (res.result === "fail") {
				setError(
					"email",
					t(`signup.SIGN_UP_ERROR__${res.error.toUpperCase()}`) as ErrorOption,
				);
			}
		});
	});

	return (
		<div
			className="w-full h-full flex items-center justify-center"
			style={{
				backgroundImage: `url(https://hubs-dev-01-assets.larchiveum.link/hubs/assets/login/background-da651ea8f8f4db5bec199e614ba84843.jpg)`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",

				width: "100%",
				height: "100%",
			}}
		>
			<Stack
				direction="col"
				justifyContent="start"
				gap={4}
				className="bg-white p-16 shadow-lg border rounded-lg "
			>
				<Stack direction="row" justifyContent="center" alignItems="center">
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

				<FormContainer onSubmit={handleSignUp} className="flex flex-col gap-2">
					<>
						{errors.email && (
							<Alert type="error" error={errors.email?.message} />
						)}
						{errors.password && (
							<Alert type="error" error={errors.password?.message} />
						)}
					</>
					<FormItem
						label={t("signup.DISPLAY_NAME_LABEL")}
						renderInput={() => (
							<TextInput
								{...register("displayName")}
								placeholder=""
								className=""
							/>
						)}
					/>

					<FormItem
						label={t("signup.EMAIL_LABEL")}
						renderInput={() => (
							<TextInput {...register("email")} placeholder="" className="" />
						)}
					/>

					<FormItem
						label={t("signup.PASSWORD_LABEL")}
						renderInput={() => (
							<TextInput
								{...register("password")}
								type="password"
								placeholder=""
								className=""
							/>
						)}
					/>

					<FormItem
						label={t("signup.RE_PASSWORD_LABEL")}
						renderInput={() => (
							<TextInput
								{...register("repassword")}
								type="password"
								placeholder=""
								className=""
							/>
						)}
					/>

					<Button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-df w-full sm:w-auto px-5 py-2.5"
					>
						{t("signup.SIGN_UP_BUTTON")}
					</Button>
				</FormContainer>

				<Typography>
					Already have an account? <a href="/auth/signin">Sign in</a>
				</Typography>
			</Stack>
		</div>
	);
};

export default SignUpForm;
