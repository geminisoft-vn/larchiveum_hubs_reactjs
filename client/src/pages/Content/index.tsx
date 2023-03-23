import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

import Sidebar from "./components/Sidebar";

import "./ContentPage.scss";

function ContentPage() {
	const navigate = useNavigate();

	const { t } = useTranslation();

	const sidebarMenuItems = [
		{
			key: "quiz",
			label: t("content.LEFT_MENU__QUIZ_LABEL"),
			onClick: () => {
				navigate("/home/content/quiz");
			},
		},
		{
			key: "document",
			label: t("content.LEFT_MENU__DOCUMENT_LABEL"),
			onClick: () => {
				navigate("/home/content/document");
			},
		},
		{
			key: "map",
			label: t("content.LEFT_MENU__MAP_LABEL"),
			onClick: () => {
				navigate("/home/content/map");
			},
		},
	];

	return (
		<div className="grid grid-cols-12 gap-2">
			<div className="col-span-3" >
				<Sidebar items={sidebarMenuItems} />
			</div>
			<div className="col-span-9" >
				<Outlet />
			</div>
		</Grid>
	);
}

export default ContentPage;
