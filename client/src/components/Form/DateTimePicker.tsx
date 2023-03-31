import { TextField } from "@mui/material";
import { DateTimePicker as MUIDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const DateTimePicker = () => (
	<MUIDateTimePicker
		slots={{
			textField: TextField,
		}}
	/>
);

export default DateTimePicker;
