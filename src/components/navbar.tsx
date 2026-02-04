import { Link } from "@tanstack/react-router";
import {
  Banknote,
  Calendar,
  CircleCheck,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import logo from "/logo.svg";

export const Navbar = () => {
  return (
    <aside className="w-64 shrink-0 border-r h-screen border-[#242d47] bg-background-light dark:bg-background-dark flex flex-col p-4 ">
      <div className="flex pb-4">
        <div className="size-14">
          <img src={logo} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Domus</h1>
          <h2 className="text-sm text-gray-500">Household Mgmt</h2>
        </div>
      </div>
      <nav className="flex flex-col gap-4">
        <Link
          activeProps={{
            className: "border-l-4 border-primary bg-accent-foreground/10",
          }}
          className="flex items-center gap-3 px-2 py-2 active-nav text-white rounded-md"
          to="/home"
        >
          <LayoutDashboard />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        <Link
          activeProps={{
            className: "border-l-4 border-primary bg-accent-foreground/10",
          }}
          className="flex items-center gap-3 px-2 py-2 active-nav text-white rounded-md"
          to="/tasks"
        >
          <CircleCheck />
          <span className="text-sm font-medium">Tarefas</span>
        </Link>
        <Link
          activeProps={{
            className: "border-l-4 border-primary bg-accent-foreground/10",
          }}
          className="flex items-center gap-3 px-2 py-2 active-nav text-white rounded-md"
          to="/schedule"
        >
          <Calendar />
          <span className="text-sm font-medium">Agenda</span>
        </Link>
        <Link
          activeProps={{
            className: "border-l-4 border-primary bg-accent-foreground/10",
          }}
          className="flex items-center gap-3 px-2 py-2 active-nav text-white rounded-md"
          to="/finances"
        >
          <Banknote />
          <span className="text-sm font-medium">Finanças</span>
        </Link>
        <Link
          activeProps={{
            className: "border-l-4 border-primary bg-accent-foreground/10",
          }}
          className="flex items-center gap-3 px-2 py-2 active-nav text-white rounded-md"
          to="/settings"
        >
          <Settings />
          <span className="text-sm font-medium">Configurações</span>
        </Link>
      </nav>
    </aside>
  );
};
