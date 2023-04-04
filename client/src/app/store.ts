import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { Action, combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import ExhibitionSlide from "src/features/exhibition/ExhibitionSlide";
import LoaderSlice from "src/features/loader/LoaderSlice";
import ModalSlice from "src/features/modal/ModalSlice";
import ProgressSlice from "src/features/progress/ProgressSlice";
import ToastSlice from "src/features/toast/ToastSlice";
import UserSlice from "src/features/user/UserSlice";

const reducers = combineReducers({
	modal: ModalSlice,
	progress: ProgressSlice,
	user: UserSlice,
	loader: LoaderSlice,
	toast: ToastSlice,
	exhibition: ExhibitionSlide,
});

const persistConfig = {
	key: "__LARCHIVEUM__STORE",
	storage,
	whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export default store;
