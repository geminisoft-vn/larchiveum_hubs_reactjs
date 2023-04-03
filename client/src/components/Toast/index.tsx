import { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

import { useAppDispatch } from "src/app/hooks";
import { hideToast } from "src/features/toast/ToastSlice";

const Toast = (props) => {
	const { isActive, type, message } = props;
	const dispatch = useAppDispatch();

	const handleHideToast = useCallback(() => {
		dispatch(hideToast());
	}, [dispatch]);

	useEffect(() => {
		setTimeout(handleHideToast, 2000);
	}, [handleHideToast]);

	return ReactDOM.createPortal(
		<div
			id="__LARCHIVEUM__COMPONENT__TOAST__"
			className={clsx(
				"fixed top-8 left-1/2 mb-4 flex w-full max-w-xs -translate-x-1/2 items-center rounded-lg bg-white p-4 text-gray-500 shadow transition-all duration-200 dark:bg-gray-800 dark:text-gray-400",
				isActive ? "opacity-1 visible" : "invisible opacity-0",
			)}
			role="alert"
		>
			<div
				className={clsx(
					"inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg dark:bg-green-800 dark:text-green-200",
					type === "default" && "bg-gray-100 text-gray-500",
					type === "error" && "bg-red-100 text-red-500",
					type === "success" && "bg-green-100 text-green-500",
				)}
			>
				{type === "default" && (
					<>
						<svg
							aria-hidden="true"
							className="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="sr-only">Default icon</span>
					</>
				)}

				{type === "error" && (
					<>
						<svg
							aria-hidden="true"
							className="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="sr-only">Error icon</span>
					</>
				)}

				{type === "success" && (
					<>
						<svg
							aria-hidden="true"
							className="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="sr-only">Success icon</span>
					</>
				)}
			</div>
			<div className="ml-3 text-sm font-normal">{message}</div>
			<button
				type="button"
				className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
				data-dismiss-target="#toast-success"
				aria-label="Close"
				onClick={handleHideToast}
			>
				<span className="sr-only">Close</span>
				<svg
					aria-hidden="true"
					className="h-5 w-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</div>,
		document.querySelector("body") as HTMLElement,
	);
};

export default Toast;
