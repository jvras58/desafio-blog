import { ModeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/painel/user-nav";
import { SheetMenu } from "@/components/painel/sheet-menu";

interface NavbarProps {
  title: string;
  showUserNav?: boolean;
}

export function Navbar({ title, showUserNav = true }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
          {showUserNav && <UserNav />}
        </div>
      </div>
    </header>
  );
}