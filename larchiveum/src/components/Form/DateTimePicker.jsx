import React from "react";
import { TextField } from "@mui/material";
import { DateTimePicker as MUIDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const DateTimePicker = () => {
  return (
    <MUIDateTimePicker
      slots={{
        textField: TextField,
      }}
      slotProps={{ fullWidth: true }}
    />
  );
};

export default DateTimePicker;
