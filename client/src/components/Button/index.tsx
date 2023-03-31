import clsx from "clsx";

type Props = {
	beforeIcon?: JSX.Element;
	afterIcon?: JSX.Element;
	onClick?: (_e: React.SyntheticEvent) => void;
	className?: string;
	type?: "button" | "reset" | "submit";
	variant?: "default" | "link";
	children: JSX.Element | JSX.Element[] | string | (JSX.Element | JSX.Element[] | string)[];
};

const Button = (props: Props) => {
	const { beforeIcon, afterIcon, onClick, className, type, variant, children } = props;

	return (
		<button
			className={clsx(
				"flex justify-center items-center gap-2",
				variant === "default" && "rounded border border-gra border-gray-200 p-2",
				variant === "link" && "font-bold text-blue-500",
				className,
			)}
			onClick={onClick}
			type={type || "button"}
		>
			{beforeIcon}
			{children}
			{afterIcon}
		</button>
	);
};

Button.defaultProps = {
	beforeIcon: null,
	afterIcon: null,
	className: "",
	type: "button",
	variant: "default",
	onClick: undefined,
};

export default Button;
