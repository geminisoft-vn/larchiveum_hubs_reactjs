import React from "react";

import { DateTimePicker as MUIDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";

const DateTimePicker = () => {
  return (
    <MUIDateTimePicker
      slots={{
        textField: TextField
      }}
      slotProps={{ fullWidth: true }}
    />
  );
};

export default DateTimePicker;
