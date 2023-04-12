import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "src/interfaces";

import { login } from "./thunks";

type TInitialState = {
	data: Partial<IUser>;
	authentication: {
		token: string;
		expire: number;
		isAuthenticated: boolean;
	};
};

const INITIAL_STATE: TInitialState = {
	data: {
		avatar: "",
		displayName: "",
		email: "",
		id: 0,
		type: 0,
	},
	authentication: {
		token: "",
		expire: 0,
		isAuthenticated: false,
	},
};

const userSlice = createSlice({
	name: "user",
	initialState: INITIAL_STATE,
	reducers: {
		logout: () => INITIAL_STATE,
		updateUser: (state, action) => {
			state.data = { ...state.data, ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.data = action.payload.data;
			state.authentication = action.payload.authentication;
		});
	},
});

export const { logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
