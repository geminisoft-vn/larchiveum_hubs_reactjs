import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
	percent: number;
};

const INITIAL_STATE: TInitialState = {
	percent: 0,
};

const quizSlice = createSlice({
	name: "quiz",
	initialState: INITIAL_STATE,
	reducers: {
		updateQuiz: (state, action: PayloadAction<number>) => {
			state.percent = action.payload;
		},
	},
});

export const { updateQuiz } = quizSlice.actions;
export default quizSlice.reducer;
