import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "src/app/store";

export const getUserTokenExpiration = createSelector(
	(state: RootState) => state.user.authentication,
	(authen) => authen.expire,
);

export const getUserInfo = createSelector(
	(state: RootState) => state.user.data,
	(user) => user,
);

export const getHubsToken = createSelector(
	(state: RootState) => state.user.authentication,
	(authen) => authen.hubsToken,
);

export const getUserAuthenticationStatus = createSelector(
	(state: RootState) => state.user.authentication,
	(authen) => authen.isAuthenticated,
);
