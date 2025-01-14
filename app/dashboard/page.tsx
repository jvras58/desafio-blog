import { ContentLayout } from "@/components/painel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarSettings } from "@/components/sidebar/SidebarSettings";
import PainelLayout from "@/components/painel/painel-layout";
import { Metadata } from "next";
import DashboardContent from "@/components/dashboard/dashboard-content";

export const metadata: Metadata = {
	title: "Dashboard",  	
	description: "Pagina de Dashboard",
};

export default function DashboardPage() {
  return (
    <PainelLayout>
    <ContentLayout title="Home">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SidebarSettings />
      <DashboardContent />
    </ContentLayout>
    </PainelLayout>
  );
}
