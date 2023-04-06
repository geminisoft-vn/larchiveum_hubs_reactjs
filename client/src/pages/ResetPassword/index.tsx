import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import UserService from "src/api/UserService";
import { useAppDispatch } from "src/app/hooks";
import {
	Button,
	FormContainer,
	FormItem,
	Stack,
	TextInput,
	Typography,
} from "src/components";
import { closePopup, openPopup } from "src/features/popup/PopupSlide";
import { IUserAuthenticationForm } from "src/interfaces";
import { getLanguage, setLanguage } from "src/language";

const ResetPasswordPage = () => {
	const { t } = useTranslation();

	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const [searchParams] = useSearchParams();

	const { handleSubmit, register, setError } = useForm<IUserAuthenticationForm>(
		{
			defaultValues: {
				password: "",
				repassword: "",
			},
		},
	);

	const handleClosePopup = () => {
		dispatch(closePopup());
	};

	const handleResetPassword = handleSubmit((data) => {
		const token = searchParams.get("token");
		if (token) {
			const dataToSend = {
				access_token: token,
				password: data.password,
			};

			if (data.password !== data.repassword) {
				setError("password", {
					type: "not-match",
					message: "Re-entered password does not match",
				});
				return false;
			}
			UserService.resetPassword(dataToSend)
				.then((res) => {
					if (res.result === "ok") {
						dispatch(
							openPopup({
								isActive: true,
								title: t("reset_password.POPUP_NOTIFICATION__TITLE"),
								content: t("reset_password.POPUP_NOTIFICATION__MESSAGE"),
								actions: [
									{
										text: t("reset_password.POPUP_NOTIFICATION__OKAY"),
										callback: () => {
											navigate("/auth/signin");
											handleClosePopup();
										},
									},
								],
							}),
						);
					}
				})
				.catch((error) => {
					if (error.response) {
						setError("password", {
							type: error.response.data.error,
							message: error.response.data.error,
						});
					}
				});
		}
		return false;
	});

	useEffect(() => {
		setLanguage(getLanguage());
	}, []);

	return (
		<Stack
			direction="col"
			alignItems="center"
			gap={2}
			className="rounded-lg border bg-white p-16 shadow-lg"
		>
			<FormContainer
				onSubmit={handleResetPassword}
				className="flex flex-col gap-2"
			>
				<Typography className="text-center text-lg font-bold">
					{t("reset_password.RESET_PASSWORD")}
				</Typography>

				<FormItem
					label={t("reset_password.PASSWORD_LABEL")}
					renderInput={() => {
						return <TextInput type="password" {...register("password")} />;
					}}
				/>

				<FormItem
					label={t("reset_password.RE_PASSWORD_LABEL")}
					renderInput={() => {
						return <TextInput type="password" {...register("repassword")} />;
					}}
				/>

				<Button
					type="submit"
					className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
				>
					{t("reset_password.SAVE_BUTTON")}
				</Button>
			</FormContainer>
			<p className="">
				{t("reset_password.SIGN_IN_LABEL")}{" "}
				<Link to="/auth/signin" className="">
					{t("reset_password.SIGN_IN_BUTTON")}
				</Link>
			</p>
		</Stack>
	);
};

export default ResetPasswordPage;
