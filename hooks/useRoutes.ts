import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRoutes = () => {
    const pathname = usePathname()
    const {conversationId} = useConversation()

    const routes = useMemo(() => [
        {label: 'Chat', href: '/conversations', active: pathname=== '/conversations' || !!conversationId}, 
        {label: 'Users', href: '/users', active: pathname === '/users'}, 
        {label: 'Logout', href: '#', onClick: () => signOut()}], 
        [pathname, conversationId]) 

        return routes
}

export default useRoutes