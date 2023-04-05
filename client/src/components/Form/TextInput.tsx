import React, { forwardRef } from "react";
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
	readOnly?: boolean;
	className?: string;
	type?: "text" | "password" | "number";
};

const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const {
		name,
		onChange,
		onBlur,
		onFocus,
		onMouseDown,
		placeholder,
		required,
		disabled,
		readOnly,
		className,
		type,
	} = props;

	return (
		<input
			ref={ref}
			type={type}
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
			placeholder={placeholder}
			className={clsx(
				"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-df text-gray-900 outline-0 focus:border-blue-500",
				className,
			)}
			required={required}
			disabled={disabled}
			readOnly={readOnly}
		/>
	);
});

TextInput.defaultProps = {
	disabled: false,
	required: false,
	readOnly: false,
	className: "",
	placeholder: "",
	onBlur: undefined,
	onFocus: undefined,
	onMouseDown: undefined,
	type: "text",
};

export default TextInput;
