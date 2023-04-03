import { Suspense } from "react";
import { useSelector } from "react-redux";

import "src/language";

import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import { getModalInfo } from "./features/modal/ModalSlice";
import { getToastInfo } from "./features/toast/ToastSlice";
import { Loader, Modal, Toast } from "./components";
import Router from "./routes";

import "./index.css";

const App = () => {
	const isActiveLoader = useSelector(
		(state: RootState) => state.loader.isActive,
	);

	const { isActive, width, title, content, actions } =
		useAppSelector(getModalInfo);
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
			{isActive && (
				<Modal.Text
					isActive={isActive}
					content={content}
					width={width}
					title={title}
					actions={actions}
				/>
			)}
			{isActiveLoader && <Loader />}
			{shouldShowToast && (
				<Toast isActive={shouldShowToast} type={type} message={message} />
			)}
		</>
	);
};

export default App;
