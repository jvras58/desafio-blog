import Link from "next/link";
import PainelLayout from "@/components/painel/painel-layout";
import { ContentLayout } from "@/components/painel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarSettings } from "@/components/sidebar/SidebarSettings";
import UserContent from "@/components/controller/user-content";
import { Metadata } from "next";
import { auth } from "@/auth";
import Forbidden from "@/components/auth/forbidden";

export const metadata: Metadata = {
	title: "Administração de Usuários",	
	description: "Administração de Usuários",
};	

export default async function Users() {
	const session = await auth();
	if (session?.user?.role !== "ADMIN") {
			return <Forbidden />;
	}

	return (
		<PainelLayout>
		<ContentLayout title="Users">
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
				<BreadcrumbPage>Usuarios</BreadcrumbPage>
			</BreadcrumbItem>
			</BreadcrumbList>
			</Breadcrumb>
				<SidebarSettings />
				<UserContent />
		</ContentLayout>
		</PainelLayout>
	);
}