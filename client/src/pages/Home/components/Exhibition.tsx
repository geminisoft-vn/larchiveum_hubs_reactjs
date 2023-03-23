import React from "react";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Stack,
} from "@mui/material";
import moment from "moment";

import { Button, Typography } from "src/components";
import { getLanguage } from "src/language";

function Exhibition(props) {
	const { exhibition } = props;
	return (
		<Card>
			<CardActionArea>
				<CardMedia
					component="img"
					height={200}
					src={exhibition.room.thumbnailUrl}
					alt={exhibition.room.name}
				/>
				<CardContent>
					<Stack direction="column" spacing={1}>
						<Stack direction="row" justifyContent="space-between">
							<Stack direction="row" alignItems="center" spacing={1}>
								{exhibition.public ? (
									<PublicRoundedIcon />
								) : (
									<ShieldRoundedIcon />
								)}
								<Typography>{exhibition.name}</Typography>
							</Stack>
							<Stack direction="row" alignItems="center" spacing={1}>
								<GroupRoundedIcon />
								<Typography>
									{exhibition.reservationCount}/{exhibition.maxSize}
								</Typography>
							</Stack>
						</Stack>
						<Stack direction="column" spacing={1}>
							{exhibition.startDate && (
								<Stack direction="row" alignItems="center" spacing={1}>
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
								<Stack direction="row" alignItems="center" spacing={1}>
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
					</Stack>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button variant="outlined">Enter</Button>
			</CardActions>
		</Card>
	);
}

export default Exhibition;
