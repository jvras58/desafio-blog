import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/painel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { SidebarSettings } from "@/components/sidebar/SidebarSettings";
import PainelLayout from "@/components/painel/painel-layout";
import { Metadata } from "next";
import { auth } from "@/auth";
import BlogPosts from "@/components/posts/blog-content";
import Forbidden from "@/components/auth/forbidden";

export const metadata: Metadata = {
	title: "Posts",  	
	description: "Pagina de Posts",
};

export default async function PostsPage() {
  const session = await auth();
    if (!session) {
        return <Forbidden />;
    }
    
    console.log("token:",session.user);

    // const token = session.user.id;
  return (
    <PainelLayout>
    <ContentLayout title="Todas os Posts">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Posts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SidebarSettings />
      <BlogPosts />
    </ContentLayout>
    </PainelLayout>
  );
}
