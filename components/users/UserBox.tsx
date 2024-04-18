"use client";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import Avatar from "../Avatar";

interface UserBoxProps {
  data: User;
}

function UserBox({ data }: UserBoxProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        // router.push(`/conversations/${data.data.id}`);
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);
  return (
    <div onClick={handleClick}>
      <Avatar user={data} />
      <div>
        <p>{data.name}</p>
      </div>
    </div>
  );
}

export default UserBox;
