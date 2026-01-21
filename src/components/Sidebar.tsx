import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar as SSidebar,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import {
  BookCheck,
  Check,
  Cog,
  History,
  LayoutDashboardIcon,
  LucideProps,
  Users,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type SidebarNavItem = {
  label: string;
  to: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  disabled?: boolean;
};

const sidebarItemBase =
  "flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors";

const sidebarItemIdle =
  "text-muted-foreground hover:bg-accent/10 hover:text-accent";

const sidebarItemActive = "bg-accent/20 text-accent-foreground font-medium";

const Sidebar = () => {
  const userNavItems: SidebarNavItem[] = [
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboardIcon },
    { label: "Tarefas", to: "/tasks", icon: BookCheck },
    { label: "Aprovações", to: "/approval", icon: Check },
  ];

  const houseNavItems: SidebarNavItem[] = [
    { label: "Histórico", to: "/history", icon: History },
    { label: "Membros", to: "/members", icon: Users },
  ];

  const settingsNavItems: SidebarNavItem[] = [
    { label: "Config", to: "/configurations", icon: Cog },
  ];

  return (
    <SSidebar className="w-60 h-[calc(100vh-64px)] bg-muted shadow-lg sticky left-0 top-0">
      <SidebarHeader>Domus</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {userNavItems.map((item: SidebarNavItem) => (
            <SidebarItem key={item.to} item={item} />
          ))}
        </SidebarGroup>
        <SidebarGroup>
          {houseNavItems.map((item: SidebarNavItem) => (
            <SidebarItem key={item.to} item={item} />
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {settingsNavItems.map((item: SidebarNavItem) => (
          <SidebarItem key={item.to} item={item} />
        ))}
      </SidebarFooter>
    </SSidebar>
  );
};

const SidebarItem = ({ item }: { item: SidebarNavItem }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          to={item.to}
          activeOptions={{ exact: true }}
          className={sidebarItemBase + " " + sidebarItemIdle}
          activeProps={{
            className: sidebarItemBase + " " + sidebarItemActive,
          }}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default Sidebar;
