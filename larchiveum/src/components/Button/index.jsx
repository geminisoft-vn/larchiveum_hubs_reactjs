import React from "react";
import { Button as MUIButton } from "@mui/material";
import PropTypes from "prop-types";

const Button = (props) => {
  const { beforeIcon, afterIcon, onClick } = props;
  return (
    <button
      className=" border-gra flex items-center gap-2 rounded border border-gray-200 p-2 hover:border-blue-500 hover:text-blue-500"
      onClick={onClick}
    >
      {beforeIcon}
      {props.children}
      {afterIcon}
    </button>
  );
  // return <MUIButton {...props}>{props.children}</MUIButton>;
};

Button.propTypes = {
  beforeIcon: PropTypes.element,
  afterIcon: PropTypes.element,
  onClick: PropTypes.func,
};

export default Button;
