import { auth } from "@/auth";
import UserSettingsForm from "@/components/auth/user-settings-form";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default async function SettingsContent() {
  const session = await auth();

  return (
    <div className="container mx-auto py-6">
      <Card className="border-none">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            <div className="border-b pb-4">
              <h1 className="text-3xl font-semibold">Configurações</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
              <nav className="space-y-2 text-sm">
                <Link 
                  href="#geral" 
                  className="block p-2 rounded-lg hover:bg-muted font-semibold text-primary"
                >
                  Geral
                </Link>
              </nav>
              <div className="space-y-6">
                <UserSettingsForm user={session?.user} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}