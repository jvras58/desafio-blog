import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
  isPadrao?: boolean;
  isAdmin?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  isPadrao?: boolean;
  isAdmin?: boolean;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          isPadrao: true,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Conteúdo",
      menus: [
        {
          href: "",
          label: "Posts",
          icon: SquarePen,
          isPadrao: true,
          submenus: [
            {
              href: "/posts",
              label: "Posts",
              isPadrao: true
            },
            {
              href: "/posts/new",
              label: "Novo Post",
              isPadrao: true
            }
          ]
        },
        // {
        //   href: "/categories",
        //   label: "Categories",
        //   icon: Bookmark,
        //   isPadrao: true
        // },
        {
          href: "/tags",
          label: "Tags",
          icon: Tag,
          isPadrao: true
        }
      ]
    },
    {
      groupLabel: "Configurações",
      menus: [
        {
          href: "/auth/users",
          label: "Users",
          icon: Users,
          isAdmin: true
        },
        {
          href: "/auth/settings",
          label: "Conta",
          icon: Settings,
          isPadrao: true
        }
      ]
    }
  ];
}