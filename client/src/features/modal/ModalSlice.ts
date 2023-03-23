import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TModalAction } from "src/types";

type TInitialState = {
	isActive: boolean;
	width?: number;
	title?: string;
	body?: JSX.Element | JSX.Element[] | null;
	actions?: TModalAction[];
};

const INITIAL_STATE: TInitialState = {
	isActive: false,
	width: 0,
	title: "",
	body: null,
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
				body: null,
				actions: [],
			});
		},
		// increment: (state, action: PayloadAction<number>) => state + action.payload,
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
