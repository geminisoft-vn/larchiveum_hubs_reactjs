import ReactDOM from "react-dom";
import clsx from "clsx";

import { useAppDispatch } from "src/app/hooks";
import { closePopup } from "src/features/popup/PopupSlide";

import Button from "../Button";

const Popup = (props) => {
	const { isActive, title, width, content, actions } = props;

	const dispatch = useAppDispatch();

	const handleClosePopup = () => {
		dispatch(closePopup());
	};

	return ReactDOM.createPortal(
		<div
			className={clsx(
				"fixed top-1/2 left-1/2 right-0 z-[999] flex h-[calc(100%-1rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-y-auto overflow-x-hidden p-4 drop-shadow-2xl transition-all duration-200",
				isActive ? "opacity-1 visible" : "invisible opacity-0",
			)}
			style={{
				width,
			}}
		>
			<div className="relative flex h-full w-full flex-1 items-center justify-center">
				<div className="relative flex-1 rounded-lg bg-white dark:bg-gray-700">
					<button
						type="button"
						className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
						onClick={handleClosePopup}
					>
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
						<span className="sr-only">Close modal</span>
					</button>
					<div className="p-6 text-center">
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<h2 className="text-4xl font-bold">{title}</h2>
								<p className="text-lg font-normal text-gray-500 ">{content}</p>
							</div>

							<div className="flex items-center justify-center gap-2">
								{actions &&
									actions.length > 0 &&
									actions.map((action) => (
										<Button
											key={action.text}
											onClick={() => {
												if (action.callback) action.callback();
											}}
											important={action.important}
											className={action.className}
										>
											{action.text}
										</Button>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>,
		document.querySelector("#LARCHIVEUM__POPUP") as HTMLElement,
	);
};

export default Popup;
