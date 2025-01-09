import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  const { data: session } = useSession();
  
  if (!session?.user?.role) {
    return null;
  }

  return session.user.role === "ADMIN" ? session.user.role : null;
};