import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import LoaderSlice from "./features/loader/LoaderSlice";
import ModalSlice from "./features/modal/ModalSlice";
import ProgressSlice from "./features/progress/ProgressSlice";
import UserSlice from "./features/user/UserSlice";

const reducers = combineReducers({
	modal: ModalSlice,
	progress: ProgressSlice,
	user: UserSlice,
	loader: LoaderSlice,
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

export default store;
