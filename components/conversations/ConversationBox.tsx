"use client";

import { Conversation, Message, User } from "@prisma/client";
import React from "react";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/hooks/useOtherUser";
import { useRouter } from "next/navigation";
import Avatar from "../Avatar";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

function ConversationBox({ data, selected }: ConversationBoxProps) {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div className="border-4 w-full min-h-[100px] rounded-lg">
      <Avatar user={otherUser} />
      <div>{data.name || otherUser.name}</div>
      <div>
        {lastMessage?.createdAt && (
          <p>{format(new Date(lastMessage.createdAt), "p")}</p>
        )}
      </div>
      <div>{lastMessageText}</div>
    </div>
  );
}

export default ConversationBox;
