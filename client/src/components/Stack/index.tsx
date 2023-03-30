import clsx from "clsx";

type Props = {
	children: JSX.Element | JSX.Element[] | string;
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
				`justify-${justifyContent || "start"}`,
				`items-${alignItems || "start"}`,
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
	alignItems: "start",
	justifyContent: "start",
	gap: 0,
	className: "",
};

export default Stack;
