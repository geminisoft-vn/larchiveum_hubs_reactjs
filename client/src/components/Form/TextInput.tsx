import React, { forwardRef } from "react";
import clsx from "clsx";

type Props = {
	name: string;
	onChange: () => void;
	onBlur: () => void;
	placeholder: string;
	required: boolean;
	disabled: boolean;
	className: string;
};

const TextInput = forwardRef((props: Props, ref) => {
	const { name, onChange, onBlur, placeholder, required, disabled, className } =
		props;

	return (
		<input
			ref={ref}
			type="text"
			name={name}
			onChange={onChange}
			onBlur={onBlur}
			placeholder={placeholder}
			className={clsx(
				"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-0 focus:border-blue-500",
				className
			)}
			required={required}
			disabled={disabled}
		/>
	);
});

export default TextInput;
