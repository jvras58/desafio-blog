import { Metadata } from "next";
import Link from "next/link";
import PainelLayout from "@/components/painel/painel-layout";
import { ContentLayout } from "@/components/painel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarSettings } from "@/components/sidebar/SidebarSettings";
import SettingsContent from "@/components/settings/settings-content";

export const metadata: Metadata = {
  title: "Conta",
  description: "Ajuste de conta",
};	

export default async function Settings() {
	return (
		<PainelLayout>
		<ContentLayout title="Conta">
		  <Breadcrumb>
			<BreadcrumbList>
			  <BreadcrumbItem>
				<BreadcrumbLink asChild>
				  <Link href="/">Home</Link>
				</BreadcrumbLink>
			  </BreadcrumbItem>
			  <BreadcrumbSeparator />
			  <BreadcrumbItem>
				<BreadcrumbLink asChild>
				  <Link href="/dashboard">Dashboard</Link>
				</BreadcrumbLink>
			  </BreadcrumbItem>
			  <BreadcrumbSeparator />
			  <BreadcrumbItem>
				<BreadcrumbPage>Conta</BreadcrumbPage>
			  </BreadcrumbItem>
			</BreadcrumbList>
		  </Breadcrumb>
		  <SidebarSettings />
		  <SettingsContent />
		</ContentLayout>
		</PainelLayout>
	);
}
