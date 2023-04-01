import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "src/app/hooks";

type TInitialState = {
	isActive: boolean;
	type: "error" | "success" | "default";
	message: string;
};

const INITIAL_STATE: TInitialState = {
	isActive: false,
	type: "default",
	message: "",
};

const toastSlice = createSlice({
	name: "toast",
	initialState: INITIAL_STATE,
	reducers: {
		showToast: (state, action: PayloadAction<Omit<TInitialState, "isActive">>) => {
			state.isActive = true;
			Object.assign(state, action.payload);
		},
		hideToast: (state) => {
			state.isActive = false;
			Object.assign(state, {
				type: "default",
				message: "",
			});
		},
	},
});

export const getToastInfo = createSelector(
	(state: RootState) => state.toast,
	(toast) => toast,
);

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
