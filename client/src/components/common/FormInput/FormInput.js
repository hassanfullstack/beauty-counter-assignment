import PropTypes from "prop-types";
import React from "react";
import { Form } from "semantic-ui-react";

const FormInput = ({
  style,
  input,
  fluid,
  key,
  icon,
  iconPosition,
  placeholder,
  onChange,
  type,
  label,
  required,
  name,
  value,
  size,
  min,
  accept,
  disabled = false,
}) => (
  <Form.Input
    style={style}
    accept={accept}
    input={input}
    key={key}
    min={min}
    fluid={fluid}
    icon={icon}
    iconPosition={iconPosition}
    placeholder={placeholder}
    onChange={onChange}
    type={type}
    label={label}
    required={required}
    name={name}
    value={value}
    size={size}
    disabled={disabled}
  />
);

FormInput.propTypes = {
  style: PropTypes.object,
  input: PropTypes.string,
  fluid: PropTypes.bool,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export { FormInput };
