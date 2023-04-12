import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import "./ContentPage.scss";

const ContentPage = () => {
	const navigate = useNavigate();

	const { t } = useTranslation();

	const sidebarMenuItems = [
		{
			key: "quiz",
			label: t("content.LEFT_MENU__QUIZ_LABEL"),
			path: "/home/content/quiz/management",
			regexMatchPath: "/home/content/quiz/*",
		},
		{
			key: "document",
			label: t("content.LEFT_MENU__DOCUMENT_LABEL"),
			path: "/home/content/document/management",
			regexMatchPath: "/home/content/document/*",
		},
		{
			key: "map",
			label: t("content.LEFT_MENU__MAP_LABEL"),
			path: "/home/content/map/management",
			regexMatchPath: "/home/content/map/*",
		},
	];

	return (
		<div className="grid grid-cols-12 gap-2">
			<div className="col-span-3">
				<Sidebar items={sidebarMenuItems} />
			</div>
			<div className="col-span-9">
				<Outlet />
			</div>
		</div>
	);
};

export default ContentPage;
