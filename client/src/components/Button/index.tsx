import clsx from "clsx";

type Props = {
	beforeIcon?: JSX.Element;
	afterIcon?: JSX.Element;
	onClick: () => void;
	className?: string;
	type?: "button" | "reset" | "submit";
	children: JSX.Element | JSX.Element[] | string;
};

const Button = (props: Props) => {
	const { beforeIcon, afterIcon, onClick, className, type, children } = props;
	return (
		/* eslint-disable react/button-has-type */
		<button
			className={clsx(
				"border-gra flex items-center gap-2 rounded border border-gray-200 p-2",
				className
			)}
			onClick={onClick}
			type={type || "button"}
		>
			{beforeIcon}
			{children}
			{afterIcon}
		</button>
		/* eslint-disable react/button-has-type */
	);
};

Button.defaultProps = {
	beforeIcon: null,
	afterIcon: null,
	className: "",
	type: "button",
};

export default Button;
