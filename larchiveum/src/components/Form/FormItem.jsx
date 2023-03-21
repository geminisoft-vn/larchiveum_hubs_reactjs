import React from "react";
import PropTypes from "prop-types";

const FormItem = (props) => {
  const { label, renderInput } = props;

  return (
    <div>
      <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      {renderInput && renderInput()}
    </div>
  );
};

FormItem.propTypes = {
  label: PropTypes.string,
  renderInput: PropTypes.func,
};

export default FormItem;
