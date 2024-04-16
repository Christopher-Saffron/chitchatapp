import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface InputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  required,
  errors,
  register,
  disabled,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        className=" text-black"
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
