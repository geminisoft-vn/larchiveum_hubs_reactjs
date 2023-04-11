import { createSelector, createSlice } from "@reduxjs/toolkit";

import { RootState } from "src/app/store";
import { IExhibition } from "src/interfaces";

type TInitialState = {
	data: IExhibition[];
};

const INITIAL_STATE: TInitialState = {
	data: [],
};

const exhibitionSlice = createSlice({
	name: "exhibition",
	initialState: INITIAL_STATE,
	reducers: {
		setExhibitions: (state, action) => {
			const { data } = action.payload;
			state.data = data;
		},
		updateExhibition: (state, action) => {
			const { id, dataToUpdate } = action.payload;
			const idx = state.data.findIndex((obj) => obj.id === id);
			if (idx > -1) {
				state.data[idx] = { ...state.data[idx], ...dataToUpdate };
			}
		},
	},
});

export const getExhibitions = createSelector(
	(state: RootState) => state.exhibition,
	(exhibition) => exhibition,
);

export const getExhibition = (exhibitionId: number) =>
	createSelector(
		(state: RootState) => state.exhibition.data,
		(data) => {
			return data.find((obj) => obj.id === exhibitionId);
		},
	);

export const { setExhibitions, updateExhibition } = exhibitionSlice.actions;
export default exhibitionSlice.reducer;
