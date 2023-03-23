import React from "react";
import clsx from "clsx";

type Props = {
	children: JSX.Element | JSX.Element[] | string;
	direction: "row" | "col";
	alignItems?: "start" | "center" | "end";
	justfyContent?: "start" | "center" | "end" | "between" | "around" | "evenly";
	gap?: number;
	className?: string;
};

const Stack = (props: Props) => {
	const { children, direction, alignItems, justfyContent, gap, className } =
		props;
	return (
		<div
			className={clsx(
				`flex`,
				direction === "row" ? "flex-row" : "flex-col",
				`justify-${justfyContent || "start"}`,
				`items-${alignItems || "start"}`,
				`gap-${gap}`,
				className
			)}
		>
			{children}
		</div>
	);
};

Stack.defaultProps = {
	alignItems: "start",
	justfyContent: "start",
	gap: 0,
	className: "",
};

export default Stack;
