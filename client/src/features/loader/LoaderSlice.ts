import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

type TInitialState = {
	isActive: boolean;
};

const INITIAL_STATE: TInitialState = {
	isActive: false,
};

const loaderSlice = createSlice({
	name: "loader",
	initialState: INITIAL_STATE,
	reducers: {
		startLoading: (state) => {
			state.isActive = true;
		},
		stopLoading: (state) => {
			state.isActive = false;
		},
	},
});

export const getLoaderInfo = createSelector(
	(state: RootState) => state.loader,
	(loader) => loader.isActive,
);

export const { startLoading, stopLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
