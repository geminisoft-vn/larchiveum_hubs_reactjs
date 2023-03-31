import { Suspense } from "react";
import { useSelector } from "react-redux";

import "src/language";

import { RootState } from "./app/store";
import { Loader, Modal, Toast } from "./components";
import Router from "./routes";

import "./index.css";

const App = () => {
	const isActiveLoader = useSelector((state: RootState) => state.loader.isActive);
	return (
		<>
			<Suspense fallback={<Loader />}>
				<Router />
			</Suspense>
			<Modal />
			{isActiveLoader && <Loader />}
			<Toast />
		</>
	);
};

export default App;
