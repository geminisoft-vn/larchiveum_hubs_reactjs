import { forwardRef, useMemo, useState } from "react";
import { Autocomplete as MUIAutocomplete, TextField } from "@mui/material";
import clsx from "clsx";

import { IScene } from "src/interfaces";

import FormItem from "./FormItem";

type Props = {
	options: IScene[];
	label: string;
	name: string;
	defaultValue: string;
	handleChange: (_id?: string) => void;
};

const AutoComplete = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { options, label, name, defaultValue, handleChange } = props;

	const [value, setValue] = useState("");

	const initialValue = useMemo(() => {
		return options.find((opt) => opt.id === defaultValue);
	}, [defaultValue, options]);

	return (
		<MUIAutocomplete
			options={options}
			inputValue={value}
			onInputChange={(e, newValue) => setValue(newValue)}
			defaultValue={initialValue}
			onChange={(e, newValue) => {
				handleChange(newValue?.id);
			}}
			renderInput={(params) => (
				<FormItem
					ref={params.InputProps.ref}
					label={label}
					renderInput={() => {
						return (
							<input
								ref={ref}
								value={value}
								name={name}
								{...{
									...params.inputProps,
									className: clsx(
										params.inputProps.className,
										"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-df text-gray-900 outline-0 focus:border-blue-500",
									),
								}}
							/>
						);
					}}
				/>
			)}
		/>
	);
});

AutoComplete.defaultProps = {};

export default AutoComplete;
