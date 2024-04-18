import getConversations from "@/actions/getConversations";
import getCurrentUser from "@/actions/getCurrentUser";
import getUsers from "@/actions/getUsers";
import ConversationList from "@/components/conversations/ConversationList";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "@/components/users/UserList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full border flex border-red-500">
        <ConversationList initialItems={conversations} />
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
