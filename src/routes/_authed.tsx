import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Header from "@/components/Header";
import { auth } from "@/lib/auth";
import { isServer } from "@/lib/env";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_authed")({
  beforeLoad: () => {
    if (isServer) return;

    console.log("🚀 ~ auth:", auth.isAuthenticated())
    if (!auth.isAuthenticated()) {
      throw redirect({ to: "/sign-in" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="flex bg-accent h-[calc(100vh-64px)]">
        <SidebarProvider>
          <Sidebar />
          <div className="p-6 w-[calc(100vw-280px)]">
            <Outlet />
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
