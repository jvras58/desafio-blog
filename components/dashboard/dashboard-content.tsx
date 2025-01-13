import { Card, CardContent } from "@/components/ui/card";
import BlogPostsList from "./blog-content";
import { auth } from "@/auth";
import Forbidden from "../auth/forbidden";


export default async function DashboardContent() {
  const session = await auth();
    if (!session) {
        return <Forbidden />;
    }
    console.log("token:",session.user);

    // const token = session.user.id;

  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
        <BlogPostsList />
        </div>
      </CardContent>
    </Card>
  );
}
