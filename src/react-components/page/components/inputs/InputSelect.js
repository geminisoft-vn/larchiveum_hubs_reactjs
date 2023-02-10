/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Space, Select } from "antd";
import "./InputSelect.scss";

export default function InputSelect({
  style,
  visible,
  value,
  defaultValue,
  options,
  disabled,
  inline,
  label,
  labelWidth,
  labelStyle,
  selectWidth,
  selectStyle,
  onChange,
  onBlur,
  onClick
}) {
  return (
    <div style={{ ...style }}>
      {label && (
        <label
          style={{
            marginRight: "20px",
            fontSize: "1em",
            fontWeight: "normal",
            marginBottom: inline ? "10px" : "none",
            display: inline ? "inline-block" : "block",
            width: labelWidth ? labelWidth : "100px",
            ...labelStyle
          }}
        >
          {label}
        </label>
      )}
      <Select
        style={{ width: selectWidth ? selectWidth : "150px", ...selectStyle }}
        value={value}
        defaultValue={defaultValue}
        options={options}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        onClick={onClick}
      />
    </div>
  );
}
