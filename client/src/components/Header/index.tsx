import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import logo from "src/assets/images/larchiveum_logo.png";
import { Button, Stack, Typography } from "src/components";
import {
	getUserAuthenticationStatus,
	getUserInfo,
} from "src/features/user/selectors";
import { logout } from "src/features/user/UserSlice";
import { getLanguage, setLanguage } from "src/language";

import "./Header.scss";

const Header = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { pathname } = useLocation();

	const [shouldOpenLocaleDropdown, setShouldOpenLocaleDropdown] =
		useState(false);

	const isAuthenticated = useAppSelector(getUserAuthenticationStatus);
	const userInfo = useAppSelector(getUserInfo);

	function handleChangeLanguage(locale: string) {
		setLanguage(locale);
		setShouldOpenLocaleDropdown(false);
	}

	const handleSignOut = () => {
		dispatch(logout());
		navigate("/home/app");
	};

	const btns = [
		{
			key: "content",
			label: t("_header.TAB_CONTENT_LABEL"),
			href: "/home/content",
			requiredUserType: 4,
		},

		{
			key: "manager",
			label: t("_header.TAB_ROOM_LABEL"),
			href: "/home/manager",
			requiredUserType: 4,
		},

		{
			key: "spoke",
			label: t("_header.TAB_SPOKE_LABEL"),
			href: `/spoke`,
			requiredUserType: 4,
		},

		{
			key: "admin",
			label: t("_header.TAB_ADMIN_LABEL"),
			href: `/admin`,
			requiredUserType: 5,
		},

		{
			key: "profile",
			label: t("home.PROFILE"),
			href: "/home/profile",
			requiredUserType: 0,
		},
	];

	return (
		<header className="sticky top-0 z-[99] w-full">
			<nav className="rounded-lg border-gray-50 bg-gray-100 p-4">
				<div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
					<Link to="/home/app" className="flex items-center">
						<img src={logo} alt="Larchiveum Logo" className="h-12" />
					</Link>
					<div className="flex items-center gap-8 md:order-2">
						<div className="relative">
							<Button
								type="button"
								onClick={() => setShouldOpenLocaleDropdown((prev) => !prev)}
							>
								{getLanguage() === "en" ? "English" : "Korea"}
								<svg
									aria-hidden="true"
									className="ml-1 h-5 w-5 md:h-4 md:w-4"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</Button>
							<div
								id="mega-menu-dropdown"
								className={clsx(
									`absolute z-10 rounded-lg border border border-gray-100 bg-white text-sm shadow-lg`,
									shouldOpenLocaleDropdown ? "grid" : "hidden",
								)}
								style={{
									width: "128px",
								}}
							>
								<div className="w-full p-4 pb-0 text-gray-900 dark:text-white md:pb-4">
									<ul
										className="space-y-4"
										aria-labelledby="mega-menu-dropdown-button"
									>
										<li>
											<button
												type="button"
												className={clsx(
													" font-bold hover:text-blue-600",
													getLanguage() === "ko"
														? "text-blue-600"
														: "text-gray-500",
												)}
												onClick={() => handleChangeLanguage("ko")}
											>
												Korea
											</button>
										</li>
										<li>
											<button
												type="button"
												className={clsx(
													"font-bold hover:text-blue-600",
													getLanguage() === "en"
														? "text-blue-600"
														: "text-gray-500",
												)}
												onClick={() => handleChangeLanguage("en")}
											>
												English
											</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div>
							{isAuthenticated ? (
								<Stack direction="row" gap={2}>
									<Typography>{userInfo.displayName}</Typography>
									<hr
										className="bg-gray-500"
										style={{
											width: 1,
											height: 24,
										}}
									/>
									<Button variant="link" onClick={handleSignOut}>
										{t(`home.SIGN_OUT`)}
									</Button>
								</Stack>
							) : (
								<>
									<Link
										to="/auth/signin"
										className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:mr-2 md:px-5 md:py-2.5"
									>
										{t(`home.SIGN_IN`)}
									</Link>

									<Link
										to="/auth/signup"
										className="mr-1 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-2 md:px-5 md:py-2.5"
									>
										{t(`home.SIGN_UP`)}
									</Link>
								</>
							)}
						</div>
					</div>
					<div
						id="mega-menu"
						className="hidden w-full items-center justify-between text-sm md:order-1 md:flex md:w-auto"
					>
						{isAuthenticated && (
							<ul className="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8">
								{btns &&
									btns.map((btn) => (
										<li key={btn.key}>
											<Link
												to={btn.href}
												className={clsx(
													"block py-2 pl-3 pr-4",
													pathname.includes(btn.href)
														? "border-b border-blue-500 text-blue-500"
														: "border-gray-100 text-gray-700",
												)}
											>
												{btn.label}
											</Link>
										</li>
									))}
							</ul>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
