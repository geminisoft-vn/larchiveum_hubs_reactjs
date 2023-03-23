import { createSlice } from "@reduxjs/toolkit";

import { TModalAction } from "src/types";

type TInitialState = {
	title: string;
	body: null;
	actions: TModalAction[];
};

const INITIAL_STATE: TInitialState = {
	title: "",
	body: null,
	actions: [],
};

const modalSlice = createSlice({
	name: "modal",
	initialState: INITIAL_STATE,
	reducers: {
		// increment: (state, action: PayloadAction<number>) => state + action.payload,
	},
});

// export const {} = modalSlice.actions;
export default modalSlice.reducer;
