import { useEffect } from "react";
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

const SignIn = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const {
		handleSubmit,
		register,
		setError,
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

	const handleLogin = handleSubmit((data) => {
		UserService.login(data).then((res) => {
			if (res.result === "ok") {
				Store.setUser(res.data);
				navigate("/");
			} else if (res.result === "fail") {
				setError(
					"email",
					t(
						`forgot_password.FORGOT_PASSWORD_ERROR__${res.error.toUpperCase()}`,
					) as ErrorOption,
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
			}}
		>
			<Stack
				direction="col"
				alignItems="center"
				gap={2}
				className="bg-white p-16 shadow-lg border rounded-lg "
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
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-df w-full sm:w-auto px-5 py-2.5"
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
		</div>
	);
};

export default SignIn;
