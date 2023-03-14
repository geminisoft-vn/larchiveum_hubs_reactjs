import React from "react";

import { DateTimePicker as MUIDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { useFormError } from "./FormErrorProvider";

const DateTimePicker = () => {
  return <MUIDateTimePicker />;
};

export default DateTimePicker;
