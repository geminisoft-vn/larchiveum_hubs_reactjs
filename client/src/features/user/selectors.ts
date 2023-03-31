import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "src/app/hooks";

export const getUserTokenExpiration = createSelector(
	(state: RootState) => state.user.authentication,
	(authen) => authen.expire,
);

export const getUserInfo = createSelector(
	(state: RootState) => state.user.data,
	(user) => user,
);

export const getUserAuthenticationStatus = createSelector(
	(state: RootState) => state.user.authentication,
	(authen) => authen.isAuthenticated,
);
