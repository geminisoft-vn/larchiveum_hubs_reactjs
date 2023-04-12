import clsx from "clsx";

type Props = {
	children:
		| JSX.Element
		| JSX.Element[]
		| string
		| (JSX.Element | JSX.Element[] | string | boolean)[]
		| undefined
		| boolean;
	direction?: "row" | "col";
	alignItems?: "start" | "center" | "end" | "stretch";
	justifyContent?: "start" | "center" | "end" | "between" | "around" | "evenly";
	gap?: number;
	className?: string;
};

const Stack = (props: Props) => {
	const { children, direction, alignItems, justifyContent, gap, className } =
		props;
	return (
		<div
			className={clsx(
				`flex`,
				direction === "row" ? "flex-row" : "flex-col",
				`justify-${justifyContent}`,
				`items-${alignItems}`,
				`gap-${gap}`,
				className,
			)}
		>
			{children}
		</div>
	);
};

Stack.defaultProps = {
	direction: "row",
	alignItems: "",
	justifyContent: "",
	gap: 0,
	className: "",
};

export default Stack;
