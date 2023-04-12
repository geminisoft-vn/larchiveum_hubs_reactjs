import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "src/app/store";
import { IPagination } from "src/interfaces";

const INITIAL_STATE: IPagination = {
	current: 0,
	prev: 0,
	hasPrev: false,
	next: 0,
	hasNext: false,
	total: 0,
};

const paginationSlice = createSlice({
	name: "pagination",
	initialState: INITIAL_STATE,
	reducers: {
		setPagination: (state, action: PayloadAction<Partial<IPagination>>) => {
			Object.assign(state, action.payload);
		},
	},
});

export const getPaginationInfo = createSelector(
	(state: RootState) => state.pagination,
	(pagination) => pagination,
);

export const { setPagination } = paginationSlice.actions;
export default paginationSlice.reducer;
