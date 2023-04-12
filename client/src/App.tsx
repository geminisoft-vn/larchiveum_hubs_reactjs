import { Suspense } from "react";
import { useSelector } from "react-redux";

import "src/language";

import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import { getPopupInfo } from "./features/popup/PopupSlide";
import { getToastInfo } from "./features/toast/ToastSlice";
import { Loader, Popup, Toast } from "./components";
import Router from "./routes";

import "./index.css";

const App = () => {
	const isActiveLoader = useSelector(
		(state: RootState) => state.loader.isActive,
	);

	const { isActive, width, title, content, actions } =
		useAppSelector(getPopupInfo);
	const {
		isActive: shouldShowToast,
		type,
		message,
	} = useAppSelector(getToastInfo);
	return (
		<>
			<Suspense fallback={<Loader />}>
				<Router />
			</Suspense>
			<Popup
				isActive={isActive}
				content={content || ""}
				width={width || 512}
				title={title}
				actions={actions}
			/>
			{isActiveLoader && <Loader />}
			{shouldShowToast && (
				<Toast isActive={shouldShowToast} type={type} message={message} />
			)}
		</>
	);
};

export default App;
