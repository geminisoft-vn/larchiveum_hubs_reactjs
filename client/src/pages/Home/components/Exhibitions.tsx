import React from "react";
import { Grid } from "@mui/material";

import Exhibition from "./Exhibition";

function Exhibitions(props) {
	const { exhibitions } = props;
	return (
		<Grid container spacing={2}>
			{exhibitions &&
				exhibitions.map((exhibition) => (
					<Grid key={exhibition.id} item lg={4} xl={4}>
						<Exhibition exhibition={exhibition} />
					</Grid>
				))}
		</Grid>
	);
}

export default Exhibitions;
