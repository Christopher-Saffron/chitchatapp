import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  user?: User;
}

function Avatar({ user }: AvatarProps) {
  return (
    <div className="border-2 border-red-500 rounded-full h-16 w-16 relative">
      <Image alt="avatar" src={user?.image || "/vercel.svg"} fill />
      <span className="absolute block rounded-full h-4 w-4 right-0 top-0 ring-white ring-2 bg-green-500"></span>
    </div>
  );
}

export default Avatar;
