import clsx from "clsx";

type Props = {
	beforeIcon?: JSX.Element;
	afterIcon?: JSX.Element;
	onClick?: (_e: React.SyntheticEvent) => void;
	className?: string;
	type?: "button" | "reset" | "submit";
	variant?: "default" | "link";
	important?: boolean;
	danger?: boolean;
	children:
		| JSX.Element
		| JSX.Element[]
		| string
		| number
		| (JSX.Element | JSX.Element[] | string)[];
};

const Button = (props: Props) => {
	const {
		beforeIcon,
		afterIcon,
		onClick,
		className,
		type,
		variant,
		children,
		important,
		danger,
	} = props;

	return (
		<button
			className={clsx(
				"flex items-center justify-center gap-2",
				variant === "default" &&
					"border-gra rounded border border-gray-200 p-2",
				variant === "link" && "font-bold text-blue-500",
				important && "bg-blue-800 text-white",
				danger && "bg-red-500 text-white",
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
	important: false,
	danger: false,
};

export default Button;
