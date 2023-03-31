import ReactDOM from "react-dom";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { closeModal, getModalInfo } from "src/features/modal/ModalSlice";
import { TModalAction } from "src/types";

import Button from "../Button";

const Modal = () => {
	const { isActive, width, title, body, actions } = useAppSelector(getModalInfo);

	const dispatch = useAppDispatch();

	return ReactDOM.createPortal(
		<div
			id="LARCHIVEUM__MODAL"
			tabIndex={-1}
			aria-hidden="true"
			className={clsx(
				`justify-center items-center fixed top-0 left-0 z-[9999] w-${
					width || "full"
				} p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] `,
				isActive ? "flex" : "hidden",
			)}
		>
			<div className="relative w-full h-full max-w-2xl md:h-auto border rounded-lg shadow-lg">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-hide="defaultModal"
							onClick={() => dispatch(closeModal())}
						>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
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
					</div>
					<div className="p-6 space-y-6">{body}</div>
					<div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
						{actions &&
							actions.length > 0 &&
							actions.map((action: TModalAction) => (
								<Button key={action.text} onClick={() => action.callback()}>
									{action.text}
								</Button>
							))}
					</div>
				</div>
			</div>
		</div>,
		document.querySelector("body") as HTMLElement,
	);
};

export default Modal;
