"use client";

import { FullMessageType } from "@/app/types";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import Avatar from "../Avatar";
import { format } from "date-fns";
import Image from "next/image";

interface MessageBoxProps {
  isLast?: boolean;
  data: FullMessageType;
}

function MessageBox({ data, isLast }: MessageBoxProps) {
  const session = useSession();

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  return (
    <div>
      <div>
        <Avatar user={data.sender} />
      </div>
      <div className=" flex items-center gap-6">
        <div className=" text-gray-600 text-xl">{data.sender.name}</div>
        <div className="text-xs text-gray-400">
          {format(new Date(data.createdAt), "p")}
        </div>
      </div>
      <div className=" bg-sky-100">
        {data.image ? (
          <Image
            className="object-cover cursor-pointer hover:scale-110 transition translate"
            src={data.image}
            alt="Image"
            height="288"
            width="288"
          />
        ) : (
          <div>{data.body}</div>
        )}
      </div>
    </div>
  );
}

export default MessageBox;
