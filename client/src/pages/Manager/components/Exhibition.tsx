import { useTranslation } from "react-i18next";
import {
	FaCodepen,
	FaLink,
	FaListOl,
	FaRegCalendarAlt,
	FaTools,
	FaUserFriends,
} from "react-icons/fa";
import moment from "moment";

import defaultImage1 from "src/assets/larchiveum/siri.gif";
import { Button, Typography } from "src/components";
import { IExhibition } from "src/interfaces";
import { getLanguage } from "src/language";
import { APP_ROOT } from "src/utilities/constants";

type Props = {
	exhibition: Partial<IExhibition>;
	openPopupCustomMedia: (_id?: number) => void;
	getSceneThumnail: (_sceneId?: string) => string;
	openPopupPublic: (_id?: number) => void;
	openPopupExhibition: (_type: "create" | "edit", _id?: number) => void;
	openPopupCloseRoom: (_id?: number) => void;
	openPopupOpenRoom: (_id?: number) => void;
	openDeleteRoom: (_id?: number) => void;
};

const Exhibition = (props: Props) => {
	const {
		exhibition,
		openPopupCustomMedia,
		getSceneThumnail,
		openPopupPublic,
		openPopupExhibition,
		openPopupCloseRoom,
		openPopupOpenRoom,
		openDeleteRoom,
	} = props;
	const { t } = useTranslation();

	const isUnavailable = Boolean(!exhibition.room);

	return (
		<div className="grid grid-cols-12 rounded-lg border">
			<div
				className="relative col-span-2"
				style={{
					maxHeight: 164,
				}}
			>
				<img
					className="h-full w-full rounded-lg object-cover"
					src={
						isUnavailable
							? defaultImage1
							: getSceneThumnail(exhibition ? exhibition.sceneId : undefined)
					}
					alt=""
				/>

				<Button
					className="absolute top-2 left-2 border-none"
					onClick={() => {
						openPopupCustomMedia(exhibition.id);
					}}
				>
					<FaTools className="text-lg text-white hover:scale-150" />
				</Button>
			</div>

			<div className="col-span-8 p-4">
				<div>
					{isUnavailable ? (
						<Typography className="font-bold">
							{t("manager.EXHIBITION_UNAVAILABLE")}
						</Typography>
					) : (
						<Typography className="text-lg font-bold">
							{exhibition.room?.name}
						</Typography>
					)}
				</div>
				<div className="flex items-center gap-2">
					<FaLink />
					<span>
						{isUnavailable ? (
							<Typography>...</Typography>
						) : (
							<a
								href={`${APP_ROOT}/${exhibition.roomId}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{`${APP_ROOT}/${exhibition.roomId}`}
							</a>
						)}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<FaUserFriends />
					{isUnavailable ? (
						<Typography>.../...</Typography>
					) : (
						<span>
							{exhibition.reservationCount}/{exhibition.maxSize}
						</span>
					)}
				</div>
				<div>
					{isUnavailable ? (
						<Typography>Invalid Date</Typography>
					) : (
						<div className="flex items-center gap-2">
							<FaRegCalendarAlt />
							<span>
								{exhibition.startDate
									? moment
											.utc(exhibition.startDate)
											.local()
											.locale(getLanguage())
											.format("L LT")
									: `<${t("manager.NOT_SET")}>`}
								<span style={{ padding: "0 10px" }}> - </span>
								{exhibition.endDate
									? moment
											.utc(exhibition.endDate)
											.local()
											.locale(getLanguage())
											.format("L LT")
									: `<${t("manager.NOT_SET")}>`}
							</span>
						</div>
					)}
				</div>
			</div>
			<div className="col-span-2 flex flex-col justify-around gap-2 p-2">
				{isUnavailable ? (
					<Button
						className="bg-red-500 text-white"
						onClick={() => {
							openDeleteRoom(exhibition.id);
						}}
					>
						{t("manager.DELETE")}
					</Button>
				) : (
					<>
						{exhibition.public ? (
							<Button
								className="bg-red-100"
								onClick={() => {
									openPopupPublic(exhibition.id);
								}}
							>
								{t("manager.PRIVATE")}
							</Button>
						) : (
							<Button
								className="bg-blue-100"
								onClick={() => {
									openPopupPublic(exhibition.id);
								}}
							>
								{t("manager.PUBLIC")}
							</Button>
						)}
						<Button
							className="bg-yellow-100"
							onClick={() => {
								openPopupExhibition("edit", exhibition.id);
							}}
						>
							{t("manager.EDIT")}
						</Button>
						{exhibition.closed ? (
							<Button
								className="bg-purple-100"
								onClick={() => {
									openPopupOpenRoom(exhibition.id);
								}}
							>
								{t("manager.OPEN_EXHIBITION")}
							</Button>
						) : (
							<Button
								className="bg-purple-100"
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
