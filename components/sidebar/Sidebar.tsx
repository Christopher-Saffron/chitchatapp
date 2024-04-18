import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import getCurrentUser from "@/actions/getCurrentUser";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <div className="border border-pink-500 w-2/3 h-screen flex">
      <DesktopSidebar currentUser={currentUser!} />
      <main>{children}</main>
    </div>
  );
}

export default Sidebar;
