import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
import { AuthContext } from "src/contexts/AuthContext";
import { getLanguage, setLanguage } from "src/language";

const SignIn = () => {
	const { t } = useTranslation();

	const { signIn } = useContext(AuthContext);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<{ email: string; password: string }>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		setLanguage(getLanguage());
	}, []);

	const handleLogin = handleSubmit(async (data) => {
		await signIn(data);
	});

	return (
		<Stack
			direction="col"
			alignItems="center"
			gap={2}
			className="rounded-lg border bg-white p-16 shadow-lg"
		>
			<>
				{errors.email && <Alert type="error" error={errors.email?.message} />}
				{errors.password && (
					<Alert type="error" error={errors.password?.message} />
				)}
			</>
			<Stack direction="row" justifyContent="center">
				<Link to="/">
					<img
						src={logo}
						alt="logo"
						style={{
							width: "256px",
						}}
					/>
				</Link>
			</Stack>
			<FormContainer onSubmit={handleLogin} className="flex flex-col gap-2">
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
							type="password"
							placeholder=""
							className=""
						/>
					)}
				/>

				<Button
					type="submit"
					className="w-full rounded-lg  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-2.5 text-df font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
				>
					{t("signin.SIGN_IN_BUTTON")}
				</Button>
			</FormContainer>

			<Typography>
				Or register at <Link to="/auth/signup">Sign up</Link>
			</Typography>

			<SigninSocialButton />

			<Typography>
				If you forgot your password{" "}
				<Link to="/auth/forgot_password">Reset password</Link>
			</Typography>
		</Stack>
	);
};

export default SignIn;
