import * as React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
} from "@mui/material";

const Select = (props) => {
  const { label, value, onChange, options } = props;

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <MUISelect value={value} label={label} onChange={onChange}>
          {options &&
            options.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
        </MUISelect>
      </FormControl>
    </Box>
  );
};

export default Select;
