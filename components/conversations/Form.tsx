"use client";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./MessageInput";

import { CldUploadButton } from "next-cloudinary";

function Form() {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", { ...data, conversationId });
  };
  return (
    <div className="flex items-center p-4 w-full border border-green-300">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={handleUpload}
        uploadPreset="miv6lfww"
      >
        <div className="border border-sky-300 p-3">IMAGE</div>
      </CldUploadButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MessageInput
          register={register}
          id="message"
          errors={errors}
          required
          placeholder="Write a Message"
        />
        <button
          type="submit"
          className="p-3 cursor-pointer bg-sky-500 hover:bg-sky-600"
        >
          SEND
        </button>
      </form>
    </div>
  );
}

export default Form;
