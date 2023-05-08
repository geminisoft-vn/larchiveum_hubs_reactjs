import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector } from "src/app/hooks";
import { Stack, Typography } from "src/components";
import { AuthContext } from "src/contexts/AuthContext";
import { getLoaderInfo } from "src/features/loader/LoaderSlice";

const VerifyPage = () => {
	const { token } = useParams();

	const { verify } = useContext(AuthContext);

	const isLoaderActive = useAppSelector(getLoaderInfo);

	useEffect(() => {
		if (!token) return;
		verify(token);
	}, []);

	return !isLoaderActive ? (
		<Stack
			direction="col"
			alignItems="center"
			gap={2}
			className="rounded-lg border bg-white p-16 shadow-lg"
		>
			<Typography className="font-bold text-xl">Verify Completed</Typography>
		</Stack>
	) : (
		<div />
	);
};

export default VerifyPage;
