import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
	data: {
		avatar: null;
		avatarId: string;
		displayName: string;
		email: string;
		id: number;
		type: number;
	};
	authentication: {
		token: string;
		expire: Date;
		isAuthenticated: boolean;
	};
};

const INITIAL_STATE: TInitialState = {
	data: {
		avatar: null,
		avatarId: "",
		displayName: "",
		email: "",
		id: 0,
		type: 0,
	},
	authentication: {
		token: "",
		expire: new Date(),
		isAuthenticated: false,
	},
};

const userSlice = createSlice({
	name: "user",
	initialState: INITIAL_STATE,
	reducers: {
		updateUser: (state, action: PayloadAction<TInitialState>) => {
			state.data = action.payload.data;
			state.authentication = action.payload.authentication;
		},
	},
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
