import React from "react";

import PropTypes from "prop-types";

import { FormProvider, useForm } from "react-hook-form";

const FormContainer = ({ handleSubmit, children, FormProps, formContext, onSuccess, onError, ...useFormProps }) => {
  if (!formContext) {
    return <FormProviderWithoutContext {...{ onSuccess, onError, FormProps, children, ...useFormProps }} />;
  }
  if (typeof onSuccess === "function" && typeof handleSubmit === "function") {
    console.warn("Property `onSuccess` will be ignored because handleSubmit is provided");
  }
  return (
    <FormProvider {...formContext}>
      <form
        noValidate
        {...FormProps}
        onSubmit={
          handleSubmit
            ? handleSubmit
            : onSuccess
            ? formContext.handleSubmit(onSuccess, onError)
            : () => console.log("submit handler `onSuccess` is missing")
        }
      >
        {children}
      </form>
    </FormProvider>
  );
};

function FormProviderWithoutContext({ onSuccess, onError, FormProps, children, ...useFormProps }) {
  const methods = useForm({
    ...useFormProps
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(
          onSuccess ? onSuccess : () => console.log("submit handler `onSuccess` is missing"),
          onError
        )}
        noValidate
        {...FormProps}
      >
        {children}
      </form>
    </FormProvider>
  );
}

FormProviderWithoutContext.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  FormProps: PropTypes.object,
  children: PropTypes.element
};

FormContainer.propTypes = {
  handleSubmit: PropTypes.func,
  children: PropTypes.element,
  FormProps: PropTypes.object,
  formContext: PropTypes.object,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

export default FormContainer;
