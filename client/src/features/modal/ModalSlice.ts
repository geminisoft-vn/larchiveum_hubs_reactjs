import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "src/app/store";
import { TModalAction } from "src/types";

type TInitialState = {
	isActive: boolean;
	width?: number;
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

const modalSlice = createSlice({
	name: "modal",
	initialState: INITIAL_STATE,
	reducers: {
		openModal: (state, action: PayloadAction<TInitialState>) => {
			Object.assign(state, action.payload);
		},
		closeModal: (state) => {
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

export const getModalInfo = createSelector(
	(state: RootState) => state.modal,
	(modal) => modal,
);

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
