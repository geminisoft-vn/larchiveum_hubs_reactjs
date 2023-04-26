import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

import { IQuestion } from "src/interfaces";

type TInitialState = {
	percent: number;
	questions: IQuestion[];
};

const INITIAL_STATE: TInitialState = {
	percent: 0,
	questions: [],
};

const quizSlice = createSlice({
	name: "quiz",
	initialState: INITIAL_STATE,
	reducers: {
		updateQuiz: (state, action: PayloadAction<number>) => {
			state.percent = action.payload;
		},
		setQuestions: (state, action) => {
			state.questions = action.payload;
		},
		updateQuestion: (state, action) => {
			const { id, dataToUpdate } = action.payload;
			const idx = state.questions.findIndex((obj) => obj.id === id);
			if (idx > -1) {
				state.questions[idx] = { ...state.questions[idx], ...dataToUpdate };
			}
		},
	},
});

export const getQuestions = createSelector(
	(state: RootState) => state.quiz,
	(quiz) => quiz.questions,
);

export const { updateQuiz, setQuestions, updateQuestion } = quizSlice.actions;
export default quizSlice.reducer;
