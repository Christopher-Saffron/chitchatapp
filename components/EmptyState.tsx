"use client";

import { signOut } from "next-auth/react";
import React from "react";

function EmptyState() {
  return (
    <div className="border border-gray-600  h-screen w-full">
      <div className=""> Select a chat or a conversation</div>
    </div>
  );
}

export default EmptyState;
