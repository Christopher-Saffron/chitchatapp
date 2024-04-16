"use client";
import React, { useState } from "react";

import useRoutes from "@/hooks/useRoutes";
import DesktopItem from "./DesktopItem";
import { signOut } from "next-auth/react";

function DesktopSidebar() {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <p>Desktop Sidebar</p>

      <ul className="flex">
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
    </div>
  );
}

export default DesktopSidebar;
