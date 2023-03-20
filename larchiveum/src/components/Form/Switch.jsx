import React from "react";
import PropTypes from "prop-types";

import { Switch as MUISwitch, FormControlLabel } from "@mui/material";

const Switch = props => {
  const { label, placement } = props;
  return <FormControlLabel control={<MUISwitch />} label={label} labelPlacement={placement} />;
};

Switch.propTypes = {
  label: PropTypes.string,
  placement: PropTypes.string
};

export default Switch;
