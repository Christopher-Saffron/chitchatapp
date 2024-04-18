"use client";
import { FullConversationType } from "@/app/types";
import useConversation from "@/hooks/useConversation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

function ConversationList({ initialItems }: ConversationListProps) {
  const [items, setItems] = useState(initialItems);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();
  return (
    <div
      className={`${
        isOpen ? "hidden" : "block w-full border border-green-500"
      }`}
    >
      <p>Messages</p>
      <div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ConversationList;
