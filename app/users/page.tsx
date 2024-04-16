import EmptyState from "@/components/EmptyState";
import { signOut } from "next-auth/react";
import React from "react";

function Users() {
  return (
    <div>
      <EmptyState />
    </div>
  );
}

export default Users;
