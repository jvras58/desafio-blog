import { Navbar } from "@/components/painel/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  showUserNav?: boolean;
}

export function ContentLayout({ title, children, showUserNav }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} showUserNav={showUserNav} />
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}