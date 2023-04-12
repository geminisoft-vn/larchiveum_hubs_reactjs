import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "src/app/store";
import { TModalAction } from "src/types";

type TInitialState = {
	isActive: boolean;
	width?: number | string;
	title?: string;
	content?: string;
	actions?: TModalAction[];
};

const INITIAL_STATE: TInitialState = {
	isActive: false,
	width: 0,
	title: "",
	content: "",
	actions: [],
};

const popupSlice = createSlice({
	name: "popup",
	initialState: INITIAL_STATE,
	reducers: {
		openPopup: (state, action: PayloadAction<TInitialState>) => {
			Object.assign(state, action.payload);
		},
		closePopup: (state) => {
			Object.assign(state, {
				isActive: false,
				width: 0,
				title: "",
				content: null,
				actions: [],
			});
		},
	},
});

export const getPopupInfo = createSelector(
	(state: RootState) => state.popup,
	(popup) => popup,
);

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
