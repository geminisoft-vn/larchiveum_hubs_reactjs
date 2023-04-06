import React, { useEffect, useState } from "react";
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
		<Stack
			direction="col"
			justifyContent="start"
			gap={4}
			className="rounded-lg border bg-white p-16 shadow-lg"
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
					{errors.email && <Alert type="error" error={errors.email?.message} />}
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
					className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-df font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
				>
					{t("signup.SIGN_UP_BUTTON")}
				</Button>
			</FormContainer>

			<Typography>
				Already have an account? <Link to="/auth/signin">Sign in</Link>
			</Typography>
		</Stack>
	);
};

export default SignUpForm;
