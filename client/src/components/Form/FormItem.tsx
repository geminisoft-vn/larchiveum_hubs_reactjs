import { forwardRef } from "react";
import clsx from "clsx";

type Props = {
	label: string;
	placement?: "top" | "left" | "right" | "bottom";
	error?: string;
	renderInput: () => JSX.Element;
};

const FormItem = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const { label, placement, error, renderInput } = props;

	return (
		<div
			ref={ref}
			className={clsx(
				"flex w-full gap-1",
				placement === "top" && "flex-col",
				placement === "bottom" && "flex-col-reverse",
				placement === "left" && "flex",
				placement === "right" && "flex-row-reverse justify-end",
			)}
		>
			<label className={clsx("font-bold text-gray-900")} htmlFor={label}>
				{label}
			</label>
			{renderInput && renderInput()}
			{error && (
				<p className="text-sm text-red-600 dark:text-red-500">{error}</p>
			)}
		</div>
	);
});

FormItem.defaultProps = {
	placement: "top",
	error: "",
};

export default FormItem;
