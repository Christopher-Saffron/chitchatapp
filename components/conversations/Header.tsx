"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import React, { useMemo } from "react";
import Avatar from "../Avatar";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

function Header({ conversation }: HeaderProps) {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <div className="p-3 border-b flex gap-4 items-center">
      <Avatar user={otherUser} />
      <div className="flex flex-col">
        <div>{conversation.name || otherUser.name}</div>
        <div>{statusText}</div>
      </div>
    </div>
  );
}

export default Header;
