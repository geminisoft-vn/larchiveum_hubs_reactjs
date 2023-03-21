import React, { forwardRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

const TextInput = forwardRef((props, ref) => {
  const { name, onChange, onBlur, placehodler, required, disabled, className } =
    props;

  return (
    <input
      ref={ref}
      type="text"
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      placehodler={placehodler}
      className={clsx(
        "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-0 focus:border-blue-500",
        className
      )}
      required={required}
      disabled={disabled}
    />
  );
});

TextInput.propTypes = {
  name: PropTypes.string,
  placehodler: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default TextInput;
