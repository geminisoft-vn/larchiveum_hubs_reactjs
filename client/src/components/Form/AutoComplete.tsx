import { Autocomplete as MUIAutocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";

const AutoComplete = (props) => {
	const { options, label, fullWidth } = props;
	return (
		<MUIAutocomplete
			options={options}
			fullWidth={fullWidth}
			renderInput={(params) => <TextField {...params} label={label} />}
		/>
	);
};

AutoComplete.propTypes = {
	options: PropTypes.array,
	label: PropTypes.string,
	fullWidth: PropTypes.bool,
};

export default AutoComplete;
