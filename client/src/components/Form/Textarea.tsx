import { forwardRef } from "react";
import clsx from "clsx";

type Props = {
	name: string;
	onChange: (_e: React.SyntheticEvent) => void;
	onBlur?: (_e: React.SyntheticEvent) => void;
	onFocus?: (_e: React.SyntheticEvent) => void;
	onMouseDown?: (_e: React.SyntheticEvent) => void;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	className?: string;
	rows?: number;
};

const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
	const {
		name,
		onChange,
		onBlur,
		onFocus,
		onMouseDown,
		placeholder,
		required,
		disabled,
		className,
		rows,
	} = props;

	return (
		<textarea
			ref={ref}
			rows={rows}
			className={clsx(
				"block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-df text-gray-900 outline-0 focus:border-blue-500",
				className,
			)}
			placeholder={placeholder}
			name={name}
			onChange={(e) => {
				if (onChange) onChange(e);
			}}
			onBlur={(e) => {
				if (onBlur) onBlur(e);
			}}
			onFocus={(e) => {
				if (onFocus) onFocus(e);
			}}
			onMouseDown={(e) => {
				if (onMouseDown) onMouseDown(e);
			}}
			required={required}
			disabled={disabled}
		/>
	);
});

Textarea.defaultProps = {
	disabled: false,
	required: false,
	className: "",
	placeholder: "",
	onBlur: undefined,
	onFocus: undefined,
	onMouseDown: undefined,
	rows: 4,
};

export default Textarea;
