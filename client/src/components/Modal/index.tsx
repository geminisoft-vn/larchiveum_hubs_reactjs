import ReactDOM from "react-dom";
import clsx from "clsx";

import { useAppDispatch } from "src/app/hooks";
import { closeModal } from "src/features/modal/ModalSlice";
import { TModalAction } from "src/types";

import Button from "../Button";
import Stack from "../Stack";

type Props = {
	isActive: boolean;
	setIsActive?: (_v: boolean) => void;
	width?: number;
	minHeight?: number;
	maxHeight?: number;
	title?: string;
	children: JSX.Element | JSX.Element[] | string | null;
	actions?: TModalAction[];
};

const Modal = (props: Props) => {
	const {
		isActive,
		setIsActive,
		width,
		minHeight,
		maxHeight,
		title,
		children,
		actions,
	} = props;

	const dispatch = useAppDispatch();

	const handleCloseModal = () => {
		dispatch(closeModal());
		if (setIsActive) setIsActive(false);
	};

	return ReactDOM.createPortal(
		<div
			id="LARCHIVEUM__MODAL"
			tabIndex={-1}
			aria-hidden="true"
			className={clsx(
				`fixed inset-0 top-0 left-0 z-50 flex h-[calc(100%-1rem)] items-center justify-center overflow-y-auto overflow-x-hidden p-4 transition-all duration-200 `,
				isActive ? "opacity-1 visible" : "invisible opacity-0",
			)}
		>
			<div
				className="relative h-full rounded-lg border bg-white shadow-lg"
				style={{
					width: `${width}px`,
					minHeight: `${minHeight}px`,
					maxHeight: `${maxHeight}px`,
				}}
			>
				<div className="relative flex h-full max-h-full flex-1 flex-col rounded-lg dark:bg-gray-700">
					<div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							{title}
						</h3>
						<button
							type="button"
							className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-hide="defaultModal"
							onClick={handleCloseModal}
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
					</div>
					<div className="h-full flex-1 overflow-hidden p-2">{children}</div>
					<div className="flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 p-4 dark:border-gray-600">
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

Modal.defaultProps = {
	width: 512,
	minHeight: 512,
	maxHeight: 512,
};

type ModalTextProps = {
	isActive: boolean;
	width?: number;
	title?: string;
	content: string;
	actions?: TModalAction[];
};

const ModalText = (props: ModalTextProps) => {
	const { isActive, width, title, content, actions } = props;
	return (
		<Modal isActive={isActive} width={width} title={title} actions={actions}>
			<Stack direction="row" justifyContent="center">
				{content}
			</Stack>
		</Modal>
	);
};

ModalText.defaultProps = {
	width: 512,

	title: "",
	actions: [],
};

Modal.Text = ModalText;

export default Modal;
