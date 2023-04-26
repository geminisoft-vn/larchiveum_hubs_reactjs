import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import UserService from "src/api/UserService";
import { useAppSelector } from "src/app/hooks";
import logo from "src/assets/images/larchiveum_logo.png";
import { Button, Stack, Typography } from "src/components";
import { getUserInfo } from "src/features/user/selectors";

const WarningVerifyPage = () => {
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();

	const email = searchParams.get("email");

	const sendEmail = (_email) => {
		UserService.reSendVerifyMail(_email)
			.then((response) => {
				if (response.data.result === "ok") {
				} else {
				}
			})
			.catch((error) => {});
	};

	return (
		<Stack
			direction="col"
			alignItems="center"
			gap={2}
			className="rounded-lg border bg-white p-16 shadow-lg"
		>
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
			<Stack direction="col" gap={2}>
				<Typography className="text-center">
					{" "}
					You need to verify your account
				</Typography>
				<Typography className="text-center">
					Please go to your email and verify your account
				</Typography>

				<Button
					onClick={() => sendEmail(email)}
					className="w-full rounded-lg  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-2.5 text-df font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
				>
					Resend Email
				</Button>
			</Stack>
			<Link className="" to="/auth/signin">
				Back Home
			</Link>
		</Stack>
	);
};

export default WarningVerifyPage;
