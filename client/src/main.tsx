import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import store from "./app/store";
import App from "./App";

import "./index.css";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("LARCHIVEUM__ROOT") as HTMLElement).render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>,
);
