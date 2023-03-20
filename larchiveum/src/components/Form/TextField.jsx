import React from "react";
import { TextField as MuiTextField } from "@mui/material";
import PropTypes from "prop-types";

const TextField = (props) => {
  const { name, type, placehodler, label, value, onChange, fullWidth } = props;
  return (
    <MuiTextField
      name={name}
      type={type}
      placeholder={placehodler}
      label={label}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
    />
  );
};

TextField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placehodler: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  fullWidth: PropTypes.bool,
};

export default TextField;
