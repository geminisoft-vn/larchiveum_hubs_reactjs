import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import moment from "moment";

import { useAppSelector } from "src/app/hooks";
import { Stack, Typography } from "src/components";
import { getUserInfo } from "src/features/user/selectors";
import { getLanguage } from "src/language";
import { APP_ROOT } from "src/utilities/constants";

import ExhibitionAction from "./ExhibitionAction";

const Exhibition = (props) => {
	const { exhibition } = props;

	const { t } = useTranslation();

	const user = useAppSelector(getUserInfo);

	return (
		<div className="relative">
			<div
				className="opacity-80"
				style={{
					height: "200px",
				}}
			>
				<img
					className="h-full w-full rounded-lg"
					src={exhibition?.room?.thumbnailUrl}
					alt={exhibition?.room?.name}
				/>
			</div>
			<Stack
				className="absolute top-2 w-full px-4"
				direction="row"
				justifyContent="between"
				alignItems="center"
				gap={1}
			>
				{exhibition.public ? (
					<PublicRoundedIcon
						style={{
							color: "#fff",
						}}
					/>
				) : (
					<ShieldRoundedIcon
						style={{
							color: "#fff",
						}}
					/>
				)}
				<Typography className="text-lg font-bold text-white">
					{exhibition.name}
				</Typography>
			</Stack>

			<Stack
				className="absolute bottom-16 flex items-center gap-2 px-4"
				direction="row"
				alignItems="center"
				gap={1}
			>
				<GroupRoundedIcon
					style={{
						color: "#fff",
					}}
				/>
				<Typography className="font-bold text-white">
					{exhibition.reservationCount}/{exhibition.maxSize}
				</Typography>
			</Stack>

			<Stack className="bottom-4" direction="col" gap={1}>
				{exhibition.startDate && (
					<Stack direction="row" alignItems="center" gap={1}>
						<CalendarMonthRoundedIcon />
						<Typography>
							{moment
								.utc(exhibition.startDate)
								.local()
								.locale(getLanguage())
								.format("L LT")}{" "}
							{" (start)"}
						</Typography>
					</Stack>
				)}

				{exhibition.endDate && (
					<Stack direction="row" alignItems="center" gap={1}>
						<CalendarMonthRoundedIcon />
						<Typography>
							{moment
								.utc(exhibition.endDate)
								.local()
								.locale(getLanguage())
								.format("L LT")}{" "}
							{" (end)"}
						</Typography>
					</Stack>
				)}
			</Stack>

			<div className="absolute bottom-2 left-1/2 -translate-x-1/2">
				<ExhibitionAction exhibition={exhibition} />
			</div>
		</div>
	);
};

export default Exhibition;
