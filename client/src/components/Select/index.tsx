import React, { forwardRef } from "react";
import clsx from "clsx";

const Select = forwardRef((props, ref) => {
	const { name, value, onChange, options } = props;

	return (
		<select
			ref={ref}
			name={name}
			className={clsx(
				"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-0 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
			)}
			value={value}
			onChange={onChange}
		>
			{/* <option selected>Choose a country</option> */}
			{options &&
				options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
		</select>
	);
});

export default Select;
