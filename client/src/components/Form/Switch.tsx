import React, { forwardRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

const Switch = forwardRef((props, ref) => {
	const { name, onChange, onBlur, className, value } = props;

	return (
		<label className={clsx("relative cursor-pointer", className)}>
			<input
				ref={ref}
				type="checkbox"
				value={value}
				defaultChecked={parseInt(value) === 1}
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
          peer-focus:ring-blue-300`
				)}
			/>
		</label>
	);
});

Switch.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string,
	className: PropTypes.string,
};

export default Switch;
