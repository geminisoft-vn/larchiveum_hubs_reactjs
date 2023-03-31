import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "src/language";

import { Loader, Modal } from "./components";
import Router from "./routes";
import store from "./store";

import "./index.css";

const App = () => (
	<Provider store={store}>
		<Suspense
			fallback={
				<div className="fixed inset-0 w-screen h-screen flex items-center justify-center fill-blue-600">
					<Loader />
				</div>
			}
		>
			<BrowserRouter basename="/larchiveum">
				<Router />
			</BrowserRouter>
		</Suspense>

		<Modal />
	</Provider>
);

export default App;
