import { useTranslation } from "react-i18next";
import moment from "moment";

import defaultImage1 from "src/assets/larchiveum/siri.gif";
import { Button, Typography } from "src/components";
import { IExhibition } from "src/interfaces";
import { getLanguage } from "src/language";
import { APP_ROOT } from "src/utilities/constants";

type Props = {
	isUnavailable: boolean;
	exhibition: Partial<IExhibition>;
	openPopupCustomMedia: (_id?: number) => void;
	getSceneThumnail: (_sceneId?: string) => string;
	openPopupPublic: (_id?: number) => void;
	openPopupExhibition: (_exhibition?: IExhibition) => void;
	setExhibitionType: (_type?: string) => void;
	openPopupCloseRoom: (_id?: number) => void;
	openPopupOpenRoom: (_id?: number) => void;
	openDeleteRoom: (_id?: number) => void;
};

const Exhibition = (props: Props) => {
	const {
		isUnavailable,
		exhibition,
		openPopupCustomMedia,
		getSceneThumnail,
		openPopupPublic,
		openPopupExhibition,
		setExhibitionType,
		openPopupCloseRoom,
		openPopupOpenRoom,
		openDeleteRoom,
	} = props;
	const { t } = useTranslation();
	return (
		<div>
			<span className="name-tour">{exhibition.name}</span>
			<img src={isUnavailable ? defaultImage1 : getSceneThumnail(exhibition ? exhibition.sceneId : undefined)} alt="" />
			<Button
				onClick={() => {
					openPopupCustomMedia(exhibition.id);
				}}
			>
				<i className="fa-solid fa-screwdriver-wrench" />
			</Button>

			<div className="content">
				<div>
					{isUnavailable ? (
						<Typography>{t("manager.EXHIBITION_UNAVAILABLE")}</Typography>
					) : (
						<Typography className="text-bold">{exhibition.room?.name}</Typography>
					)}
				</div>
				<div className="d-flex">
					<i className="fa-solid fa-link" />
					<span className="ml-1">
						{isUnavailable ? (
							<Typography>...</Typography>
						) : (
							<a href={`${APP_ROOT}/${exhibition.roomId}`} target="_blank" rel="noopener noreferrer">
								{`${APP_ROOT}/${exhibition.roomId}`}
							</a>
						)}
					</span>
				</div>
				<div className="d-flex">
					<i className="fa-solid fa-user-group" />
					{isUnavailable ? (
						<Typography>.../...</Typography>
					) : (
						<span className="ml-1">
							{exhibition.reservationCount}/{exhibition.maxSize}
						</span>
					)}
				</div>
				<div>
					{isUnavailable ? (
						<Typography>Invalid Date</Typography>
					) : (
						<div className="d-flex">
							<i className="fa-solid fa-calendar" />
							<span className="ml-1">
								{exhibition.startDate
									? moment.utc(exhibition.startDate).local().locale(getLanguage()).format("L LT")
									: `<${t("manager.NOT_SET")}>`}
								<span style={{ padding: "0 10px" }}> - </span>
								{exhibition.endDate
									? moment.utc(exhibition.endDate).local().locale(getLanguage()).format("L LT")
									: `<${t("manager.NOT_SET")}>`}
							</span>
						</div>
					)}
				</div>
			</div>
			<div className="btn-action">
				{isUnavailable ? (
					<Button
						className="btn btn-delete"
						onClick={() => {
							openDeleteRoom(exhibition.id);
						}}
					>
						{t("manager.DELETE")}
					</Button>
				) : (
					<>
						{exhibition.public === 1 ? (
							<Button
								className="btn btn-unpublish"
								onClick={() => {
									openPopupPublic(exhibition.id);
								}}
							>
								{t("manager.PRIVATE")}
							</Button>
						) : (
							<Button
								className="btn btn-publish"
								onClick={() => {
									openPopupPublic(exhibition.id);
								}}
							>
								{t("manager.PUBLIC")}
							</Button>
						)}
						<Button
							className="btn btn-edit"
							onClick={() => {
								openPopupExhibition(exhibition);
								setExhibitionType("edit");
							}}
						>
							{t("manager.EDIT")}
						</Button>
						{exhibition.closed === 1 ? (
							<Button
								className="btn btn-open"
								onClick={() => {
									openPopupOpenRoom(exhibition.id);
								}}
							>
								{t("manager.OPEN_EXHIBITION")}
							</Button>
						) : (
							<Button
								className="btn btn-close"
								onClick={() => {
									openPopupCloseRoom(exhibition.id);
								}}
							>
								{t("manager.CLOSE_EXHIBITION")}
							</Button>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Exhibition;
