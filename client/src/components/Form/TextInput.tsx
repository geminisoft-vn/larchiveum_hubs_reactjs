import React, { forwardRef } from "react";
import clsx from "clsx";

type Props = {
	name: string;
	onChange: (_e: React.SyntheticEvent) => void;
	onBlur?: (_e: React.SyntheticEvent) => void;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	className?: string;
	type?: "text" | "password";
};

const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const {
		name,
		onChange,
		onBlur,
		placeholder,
		required,
		disabled,
		className,
		type,
	} = props;

	return (
		<input
			ref={ref}
			type={type}
			name={name}
			onChange={onChange}
			onBlur={onBlur}
			placeholder={placeholder}
			className={clsx(
				"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-df text-gray-900 outline-0 focus:border-blue-500",
				className,
			)}
			required={required}
			disabled={disabled}
		/>
	);
});

TextInput.defaultProps = {
	disabled: false,
	required: false,
	className: "",
	placeholder: "",
	onBlur: undefined,
	type: "text",
};

export default TextInput;
