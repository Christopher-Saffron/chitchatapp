"use client";

import React from "react";
import { User } from "@prisma/client";
import UserBox from "./UserBox";
interface UserListProps {
  items: User[];
}

function UserList({ items }: UserListProps) {
  return (
    <aside>
      <h2>people</h2>
      {items.map((item) => (
        <UserBox key={item.id} data={item} />
      ))}
    </aside>
  );
}

export default UserList;
