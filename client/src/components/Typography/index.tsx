import React from "react";
import { Typography as MUITypography } from "@mui/material";
import PropTypes from "prop-types";

function Typography(props) {
	const { text, fullWidth } = props;
	return <MUITypography fullWidth={fullWidth}>{props.children}</MUITypography>;
}

Typography.propTypes = {
	text: PropTypes.string,
	fullWidth: PropTypes.bool,
};

export default Typography;
