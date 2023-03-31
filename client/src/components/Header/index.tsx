// @ts-nocheck
/* eslint-disable */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

import logo from "src/assets/images/larchiveum_logo.png";
import { getLanguage, setLanguage } from "src/language";
import Store from "src/utilities/store";

import "./Header.scss";

const Header = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [shouldOpenLocaleDropdown, setShouldOpenLocaleDropdown] =
		useState(false);

	const user = Store.getUser();


	function checkCredentials() {
		if (
			window?.APP?.store?.state?.credentials?.email &&
			window?.APP?.store?.state?.credentials?.token
		) {
			return true;
		}
		return false;
	}

	function handleChangeLanguage(locale: string) {
		setLanguage(locale);
		setShouldOpenLocaleDropdown(false);
	}

	const handleSignOut = () => {
		Store.removeUser();
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
			href: "/home/manager?tab=exhibition",
			requiredUserType: 4,
		},

		{
			key: "spoke",
			label: t("_header.TAB_SPOKE_LABEL"),
			href: `/home/${checkCredentials() ? "spoke" : "signin"}`,
			requiredUserType: 4,
		},

		{
			key: "admin",
			label: t("_header.TAB_ADMIN_LABEL"),
			href: `/home/${checkCredentials() ? "admin" : "signin"}`,
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
		<nav className="bg-white border-gray-200 px-2 md:px-4 py-2.5">
			<div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
				<a href="/home/app" className="flex items-center">
					<img src={logo} alt="Larchiveum Logo" className="h-12" />
				</a>
				<div className="flex items-center md:order-2">
					<div className="relative">
						<button
							type="button"
							id="mega-menu-dropdown-button"
							data-dropdown-toggle="mega-menu-dropdown"
							className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
							onClick={() => setShouldOpenLocaleDropdown((prev) => !prev)}
						>
							{getLanguage() === "en" ? "English" : "Korea"}
							<svg
								aria-hidden="true"
								className="w-5 h-5 ml-1 md:w-4 md:h-4"
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
						</button>
						<div
							id="mega-menu-dropdown"
							className={clsx(
								`absolute z-10 text-sm border bg-white border border-gray-100 rounded-lg shadow-lg`,
								shouldOpenLocaleDropdown ? "grid" : "hidden",
							)}
							style={{
								width: "128px",
							}}
						>
							<div className="w-full p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
								<ul
									className="space-y-4"
									aria-labelledby="mega-menu-dropdown-button"
								>
									<li>
										<button
											type="button"
											className={clsx(
												" hover:text-blue-600 font-bold",
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
												"hover:text-blue-600 font-bold",
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
					<Link
						to="/auth/signin"
						className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
					>
						Log In
					</Link>

					<Link
						to="/auth/signup"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					>
						Sign up
					</Link>
				</div>
				<div
					id="mega-menu"
					className="items-center justify-between hidden w-full text-sm md:flex md:w-auto md:order-1"
				>
					<ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
						{btns &&
							btns.map((btn) => (
								<li key={btn.key}>
									<Link
										to={btn.href}
										className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
									>
										{btn.label}
									</Link>
								</li>
							))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
