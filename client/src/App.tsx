import { Suspense } from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import "src/language";

import { Loader, Modal } from "./components";
import Router from "./routes";
import store, { RootState } from "./store";

import "./index.css";

const persistor = persistStore(store);

const App = () => {
	const isActiveLoader = useSelector((state: RootState) => state.loader.isActive);
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Suspense
					fallback={
						<div className="fixed inset-0 w-screen h-screen flex items-center justify-center fill-blue-600">
							<Loader />
						</div>
					}
				>
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</Suspense>

				<Modal />
				{isActiveLoader && <Loader />}
			</PersistGate>
		</Provider>
	);
};

export default App;
