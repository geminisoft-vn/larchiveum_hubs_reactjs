import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
	percent: number;
};

const INITIAL_STATE: TInitialState = {
	percent: 0,
};

const questionSlice = createSlice({
	name: "question",
	initialState: INITIAL_STATE,
	reducers: {
		updateQuestion: (state, action: PayloadAction<number>) => {
			state.percent = action.payload;
		},
	},
});

export const { updateQuestion } = questionSlice.actions;
export default questionSlice.reducer;
