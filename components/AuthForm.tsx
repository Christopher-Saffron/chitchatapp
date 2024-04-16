"use client";

type Status = "LOGIN" | "REGISTER";

import React, { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log("authenticated");
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleStatus = useCallback(() => {
    if (status === "LOGIN") {
      setStatus("REGISTER");
    } else {
      setStatus("LOGIN");
    }
  }, [status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (status === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (status === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("logged in");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("invalid credentials");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("logged in");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className=" w-1/4 border p-5">
      <p>FORM:</p>
      <p onClick={toggleStatus}>Current Form status: {status}</p>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {status === "REGISTER" && (
            <Input
              id={"name"}
              label={"Name"}
              register={register}
              errors={errors}
            />
          )}
          <Input
            id={"email"}
            label={"Email"}
            register={register}
            errors={errors}
            type={"email"}
          />
          <Input
            id={"password"}
            label={"Password"}
            type={"password"}
            register={register}
            errors={errors}
          />
          <button className="px-4 py-2 border rounded-mg" type="submit">
            {status === "LOGIN" ? "Sign in" : "Register"}
          </button>
          <hr className="my-4" />
          <button
            onClick={() => socialAction("github")}
            className="px-4 py-2 border rounded-mg"
          >
            Sign in with github
          </button>
          <button
            onClick={() => socialAction("google")}
            className="px-4 py-2 border rounded-mg"
          >
            Sign in with google
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
