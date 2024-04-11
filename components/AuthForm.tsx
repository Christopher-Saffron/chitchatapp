"use client";

type Status = "LOGIN" | "REGISTER";

import React, { useCallback, useState } from "react";
import Input from "./Input";

function AuthForm() {
  const [status, setStatus] = useState<Status>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleStatus = useCallback(() => {
    if (status === "LOGIN") {
      setStatus("REGISTER");
    } else {
      setStatus("LOGIN");
    }
  }, [status]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (status === "REGISTER") {
    }

    if (status === "LOGIN") {
    }
  };

  const handleAction = (action: string) => {
    setIsLoading(true);
  };

  return (
    <div className=" w-1/4 border p-5">
      <p>FORM:</p>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            id={"email"}
            label={"Email address"}
            type={"email"}
            // errors={{}}
          />
          <Input
            id={"password"}
            label={"Password"}
            type={"password"}
            // errors={{}}
          />
          <button className="px-4 py-2 border rounded-mg" type="submit">
            {status === "LOGIN" ? "Sign in" : "Register"}
          </button>
          <hr className="my-4" />
          <button className="px-4 py-2 border rounded-mg">
            Sign in with github
          </button>
          <button className="px-4 py-2 border rounded-mg">
            Sign in with google
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
