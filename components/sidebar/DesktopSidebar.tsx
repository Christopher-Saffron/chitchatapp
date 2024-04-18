"use client";
import React, { useState } from "react";

import useRoutes from "@/hooks/useRoutes";
import DesktopItem from "./DesktopItem";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import Avatar from "../Avatar";

interface DesktopSidebarProps {
  currentUser: User;
}

function DesktopSidebar({ currentUser }: DesktopSidebarProps) {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p>Desktop Sidebar</p>
      <div className="relative flex flex-col">
        <ul className="flex flex-col">
          <button onClick={() => signOut()}>Log Out</button>

          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.label}
              label={item.label}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
        <div onClick={() => setIsOpen(true)}>
          <Avatar />
        </div>
      </div>
    </div>
  );
}

export default DesktopSidebar;
