import Link from "next/link";

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
import BlogPosts from "@/components/posts/blog-content";

export const metadata: Metadata = {
	title: "Posts",  	
	description: "Pagina de Posts",
};

export default async function PostsPage() {
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
