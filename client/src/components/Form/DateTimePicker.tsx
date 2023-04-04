import { forwardRef, useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import clsx from "clsx";
import moment, { Moment } from "moment";

import { IExhibition } from "src/interfaces";
import { IRoom } from "src/interfaces/IRoom";

import TextInput from "./TextInput";

type Props = {
	name: keyof IExhibition;
	onChange: (_e: React.SyntheticEvent) => void;
	onBlur?: (_e: React.SyntheticEvent) => void;
	handleChangeDate: (_newDate: string) => void;
	date: Moment | null | undefined;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	className?: string;
	type?: "text" | "password";
};

const DateTimePicker = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { onBlur, date, handleChangeDate } = props;
	const [enable, setEnabled] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {
				setEnabled(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<div ref={containerRef} className="relative">
				<TextInput
					ref={ref}
					{...props}
					onFocus={() => setEnabled(true)}
					onBlur={(e) => {
						if (onBlur) onBlur(e);
					}}
					readOnly
					placeholder="DD/MM/YYYY HH:mm:SS"
				/>

				<div
					className={clsx(
						"absolute shadow-lg transition-all duration-200",
						enable ? "opacity-1 visible" : "invisible opacity-0",
					)}
				>
					<StaticDateTimePicker
						className="h-full"
						ampm={false}
						orientation="landscape"
						value={date}
						onChange={(newDate: Moment | null) => {
							handleChangeDate(newDate?.format("DD/MM/YYYY HH:mm:SS") || "");
						}}
						onError={() => setEnabled(false)}
						onAccept={() => setEnabled(false)}
						onClose={() => setEnabled(false)}
					/>
				</div>
			</div>
		</LocalizationProvider>
	);
});

DateTimePicker.defaultProps = {
	disabled: false,
	required: false,
	className: "",
	placeholder: "",
	onBlur: undefined,
	type: "text",
};

export default DateTimePicker;
