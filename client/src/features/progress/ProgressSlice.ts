import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
	percent: number;
};

const INITIAL_STATE: TInitialState = {
	percent: 0,
};

const progressSlice = createSlice({
	name: "progress",
	initialState: INITIAL_STATE,
	reducers: {
		updateProgress: (state, action: PayloadAction<number>) => {
			state.percent = action.payload;
		},
	},
});

export const { updateProgress } = progressSlice.actions;
export default progressSlice.reducer;
