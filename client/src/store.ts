import { configureStore } from "@reduxjs/toolkit";

// slices
import ModalSlice from "./features/modal/ModalSlice";
import ProgressSlice from "./features/progress/ProgressSlice";

const store = configureStore({
	reducer: {
		modal: ModalSlice,
		progress: ProgressSlice,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
