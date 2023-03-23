import { configureStore } from "@reduxjs/toolkit";

// slices
import ModalSlice from "./features/modal/ModalSlice";

const store = configureStore({
	reducer: {
		modal: ModalSlice,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
