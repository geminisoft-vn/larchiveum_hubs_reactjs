import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "src/language";

import { Loader } from "./components";
import Router from "./routes";
import store from "./store";

import "./index.css";

function App() {
	return (
		<Provider store={store}>
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
		</Provider>
	);
}

export default App;
