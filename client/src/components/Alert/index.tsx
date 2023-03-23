import React from "react";
import { Alert as MUIAlert } from "@mui/material";
import PropTypes from "prop-types";

function Alert(props) {
	const { type, message } = props;
	return <MUIAlert severity={type}>{message}</MUIAlert>;
}

Alert.propTypes = {
	type: PropTypes.string,
	message: PropTypes.string,
};

export default Alert;
