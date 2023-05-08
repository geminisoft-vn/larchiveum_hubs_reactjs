import { Suspense, useEffect } from "react";
import NProgress from "nprogress";

import "src/language";

import { useAppSelector } from "./app/hooks";
import { getPopupInfo } from "./features/popup/PopupSlide";
import { getToastInfo } from "./features/toast/ToastSlice";
import { Popup, Toast } from "./components";
import Router from "./routes";

import "./index.css";

const LazyLoad = () => {
	useEffect(() => {
		NProgress.configure({});
		NProgress.start();

		return () => {
			NProgress.done();
		};
	}, []);
	return <div />;
};

const App = () => {
	const { isActive, width, title, content, actions } =
		useAppSelector(getPopupInfo);
	const {
		isActive: shouldShowToast,
		type,
		message,
	} = useAppSelector(getToastInfo);

	useEffect(() => {
		NProgress.start();
	}, []);

	return (
		<>
			<Suspense fallback={<LazyLoad />}>
				<Router />
			</Suspense>
			<Popup
				isActive={isActive}
				content={content || ""}
				width={width || 512}
				title={title}
				actions={actions}
			/>
			{shouldShowToast && (
				<Toast isActive={shouldShowToast} type={type} message={message} />
			)}
		</>
	);
};

export default App;
