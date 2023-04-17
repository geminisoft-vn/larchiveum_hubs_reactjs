import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "src/interfaces";

type TInitialState = {
	data: Partial<IUser>;
	authentication: {
		token: string;
		hubsToken: string | undefined;
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
		hubsToken: "",
		expire: 0,
		isAuthenticated: false,
	},
};

const userSlice = createSlice({
	name: "user",
	initialState: INITIAL_STATE,
	reducers: {
		logout: () => INITIAL_STATE,
		setUser: (state, action) => {
			const { data, authentication } = action.payload;
			state.data = data;
			state.authentication = authentication;
		},
		updateUser: (state, action) => {
			state.data = { ...state.data, ...action.payload };
		},
	},
});

export const { logout, updateUser, setUser } = userSlice.actions;
export default userSlice.reducer;
