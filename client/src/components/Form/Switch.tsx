import React, { forwardRef } from "react";
import clsx from "clsx";

type Props = {
	name: string;
	className: string;
	onChange: (_e: React.SyntheticEvent) => void;
	onBlur: (_e: React.SyntheticEvent) => void;
};

const Switch = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { name, onChange, onBlur, className } = props;

	return (
		<label
			htmlFor={name}
			className={clsx("relative cursor-pointer", className)}
		>
			<input
				ref={ref}
				type="checkbox"
				name={name}
				className={clsx("peer sr-only")}
				onChange={onChange}
				onBlur={onBlur}
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

Switch.propTypes = {};

export default Switch;
