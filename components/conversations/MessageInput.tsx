"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

function MessageInput({
  placeholder,
  id,
  type,
  register,
  required,
  errors,
}: MessageInputProps) {
  return (
    <div className="relative w-full">
      <input
        className=" text-black"
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
      />
    </div>
  );
}

export default MessageInput;
