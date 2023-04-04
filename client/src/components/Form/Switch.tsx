import React, { forwardRef } from "react";
import clsx from "clsx";

type Props = {
	className?: string;
	disabled?: boolean;
	onChange: (_e: React.SyntheticEvent) => void;
	onBlur: (_e: React.SyntheticEvent) => void;
	value: boolean;
};

const Switch = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { onChange, onBlur, className, value, disabled } = props;

	return (
		<label
			className={clsx(
				"relative",
				className,
				disabled ? "cursor-not-allowed" : "cursor-pointer",
			)}
		>
			<input
				ref={ref}
				type="checkbox"
				className={clsx("peer sr-only")}
				onChange={onChange}
				onBlur={onBlur}
				disabled={disabled}
				checked={value}
			/>
			<div
				className={clsx(
					`peer h-6 w-11 
          rounded-full bg-gray-200 
          after:absolute after:top-0.5 after:left-[2px] 
          after:h-5 after:w-5 after:rounded-full 
          after:border after:border-gray-300 
          after:bg-white after:transition-all 
          after:content-[''] 
          peer-checked:bg-blue-600 peer-checked:after:translate-x-full 
          peer-checked:after:border-white peer-focus:ring-4 
          peer-focus:ring-blue-300`,
				)}
			/>
		</label>
	);
});

Switch.defaultProps = {
	className: "",
	disabled: false,
};

export default Switch;
