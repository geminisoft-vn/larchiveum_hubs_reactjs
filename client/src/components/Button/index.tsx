import clsx from "clsx";

type Props = {
	beforeIcon?: JSX.Element;
	afterIcon?: JSX.Element;
	onClick?: (_e: React.SyntheticEvent) => void;
	className?: string;
	type?: "button" | "reset" | "submit";
	variant?: "default" | "link";
	form?: string;
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
		form,
	} = props;

	return (
		<button
			className={clsx(
				"flex items-center justify-center gap-2",
				variant === "default" &&
					"border-gra rounded border border-gray-200 p-2",
				variant === "link" && "font-bold text-blue-500",
				className,
			)}
			onClick={onClick}
			type={type || "button"}
			form={form}
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
	form: "",
};

export default Button;
