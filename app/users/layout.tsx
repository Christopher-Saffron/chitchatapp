import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "@/components/users/UserList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    ///// // @ts-expect-error Server Component
    <Sidebar>
      <div className="flex border">
        <UserList items={users} />
        {children}
      </div>
      ;{" "}
    </Sidebar>
  );
}
