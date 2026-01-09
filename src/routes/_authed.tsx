import Header from "@/components/Header";
import client from "@/data/client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  beforeLoad: ({ location }) => {
    const user = client.authStore.record;
    if (!user) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
    return { user };
  },
  component: RouteComponent,
});

function RouteComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Header />
      {children}
    </div>
  );
}
