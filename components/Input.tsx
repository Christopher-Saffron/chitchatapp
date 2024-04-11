import React from "react";

interface InputProps {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  errors?: object;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  required,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} disabled={disabled} />
    </div>
  );
};

export default Input;
