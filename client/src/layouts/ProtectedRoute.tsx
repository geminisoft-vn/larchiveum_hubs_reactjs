import { Navigate } from "react-router-dom";

import { useAppSelector } from "src/app/hooks";
import { getUserTokenExpiration } from "src/features/user/selectors";
import { checkExpireJwtToken } from "src/utilities/common";

type Props = {
	children: JSX.Element | JSX.Element[];
};

const ProtectedRoute = (props: Props) => {
	const { children } = props;
	const tokenExpiration = useAppSelector(getUserTokenExpiration);

	if (!checkExpireJwtToken(tokenExpiration)) {
		return <Navigate to="/auth/signin" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
