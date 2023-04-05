import { createSelector, createSlice } from "@reduxjs/toolkit";

import { RootState } from "src/app/store";
import { IAxiosResponse, IExhibition } from "src/interfaces";

type TInitialState = Omit<IAxiosResponse<IExhibition[]>, "message" | "result">;

const INITIAL_STATE: TInitialState = {
	data: [],
	items: {},
	pages: {},
};

const exhibitionSlice = createSlice({
	name: "exhibition",
	initialState: INITIAL_STATE,
	reducers: {
		setExhibitions: (state, action) => {
			const { data, items, pages } = action.payload;
			state.data = data;
			state.items = items;
			state.pages = pages;
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
