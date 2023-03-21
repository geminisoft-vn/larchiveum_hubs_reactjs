import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

const Button = (props) => {
  const { beforeIcon, afterIcon, onClick, className, type } = props;
  return (
    <button
      className={clsx(
        "border-gra flex items-center gap-2 rounded border border-gray-200 p-2",
        className
      )}
      onClick={onClick}
      type={type || "button"}>
      {beforeIcon}
      {props.children}
      {afterIcon}
    </button>
  );
};

Button.propTypes = {
  beforeIcon: PropTypes.element,
  afterIcon: PropTypes.element,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
