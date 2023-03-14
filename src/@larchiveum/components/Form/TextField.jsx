import React, { useState } from "react";
import ReactDOM from "react-dom";
import { TextField as MuiTextField } from "@mui/material";

const TextField = props => {
  return <MuiTextField {...props} />;
};

export default TextField;
