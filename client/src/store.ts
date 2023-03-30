import { configureStore } from "@reduxjs/toolkit";

// slices
import ModalSlice from "./features/modal/ModalSlice";
import ProgressSlice from "./features/progress/ProgressSlice";
import UserSlice from "./features/user/UserSlice";

const store = configureStore({
	reducer: {
		modal: ModalSlice,
		progress: ProgressSlice,
		user: UserSlice,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
