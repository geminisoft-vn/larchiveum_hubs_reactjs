import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import moment from "moment";

import { Stack, Typography } from "src/components";
import { getLanguage } from "src/language";

import ExhibitionAction from "./ExhibitionAction";

const Exhibition = (props) => {
	const { exhibition } = props;

	return (
		<div className="relative">
			<div>
				<img
					className="h-full w-full rounded-lg brightness-50"
					src={exhibition?.room?.thumbnailUrl}
					alt={exhibition?.room?.name}
					style={{
						minHeight: 200,
					}}
				/>
			</div>
			<Stack
				direction="col"
				alignItems="start"
				justifyContent="between"
				className="absolute top-2 h-full w-full max-w-full p-4"
			>
				<Stack
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
					direction="col"
					alignItems="start"
					justifyContent="start"
					gap={1}
					className="max-w-full"
				>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="start"
						gap={2}
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

					<Stack className="max-w-full" direction="col" gap={1}>
						{exhibition.startDate && (
							<Stack direction="row" alignItems="center" gap={1}>
								<CalendarMonthRoundedIcon className="text-white" />
								<Typography className="font-bold text-white shadow-md" ellipsis>
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
								<CalendarMonthRoundedIcon className="text-white" />
								<Typography className="font-bold text-white shadow-md" ellipsis>
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
				</Stack>

				<Stack direction="row" justifyContent="center" className="w-full">
					<ExhibitionAction exhibition={exhibition} />
				</Stack>
			</Stack>
		</div>
	);
};

export default Exhibition;
