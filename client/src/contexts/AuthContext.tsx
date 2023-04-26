import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import _omit from "lodash/omit";
import _pick from "lodash/pick";

import UserService from "src/api/UserService";
import { useAppDispatch } from "src/app/hooks";
import { showToast } from "src/features/toast/ToastSlice";
import { logout, setUser } from "src/features/user/UserSlice";
import { IUser } from "src/interfaces";
import { APP_ROOT } from "src/utilities/constants";

interface IAuthContext {
	signIn: ({ email, password }) => void;
	signOut: () => void;
}

interface IJWTPayload {
	email: string;
	method: number;
	type: number;
	iat: number;
	exp: number;
}

export const AuthContext = createContext({} as IAuthContext);

type Props = {
	children: JSX.Element | JSX.Element[];
};

const AuthContextProvider = (props: Props) => {
	const { children } = props;

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const signIn = useCallback(async ({ email, password }) => {
		try {
			const res = await UserService.login({ email, password });

			const result: {
				data: Partial<IUser>;
				authentication: {
					token: string | undefined;
					hubsToken: string | undefined;
					expire: number;
					isAuthenticated: boolean;
				};
			} = {
				data: {},
				authentication: {
					token: "",
					hubsToken: "",
					expire: 0,
					isAuthenticated: false,
				},
			};

			if (res.result === "ok") {
				result.data = _omit(res.data, ["token"]);
				const { token } = _pick(res.data, ["token"]);
				const { exp } = jwtDecode<IJWTPayload>(token || "");
				result.authentication = {
					token,
					hubsToken: res.data.hubsToken,
					expire: exp,
					isAuthenticated: true,
				};
				dispatch(
					setUser({
						data: result.data,
						authentication: result.authentication,
					}),
				);
				navigate("/");
			}
		} catch (error) {
			if (error.response) {
				navigate(`/auth/warning_verify?email=${email}`);
			}
		}
	}, []);

	const signOut = useCallback(() => {
		dispatch(logout());
		navigate("/home/app");
		window.open(`${APP_ROOT}?action=signout`, "_blank");
	}, []);

	const [context] = useState({
		signIn,
		signOut,
	});

	return (
		<AuthContext.Provider value={context}>{children} </AuthContext.Provider>
	);
};

export default AuthContextProvider;
