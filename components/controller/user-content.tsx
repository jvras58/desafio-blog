import { getUsers } from "@/actions/auth/users"
import UsersStats from "@/components/auth/users-stats";
import UsersTable from "@/components/auth/users-table"
import type { User } from "@/types/shared"

import { Card, CardContent } from "@/components/ui/card";

export default async function UserContent() {
  const users: User[] = await getUsers();
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <UsersStats users={users} />
        <UsersTable users={users} />
      </CardContent>
    </Card>
  );
}
