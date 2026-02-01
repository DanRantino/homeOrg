import Header from "@/components/Header";
import { Navbar } from "@/components/navbar";
import { pb } from "@/data/pocketbase";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth")({
  component: ProtectedLayout,
});

function ProtectedLayout() {
  useEffect(() => {
    const interval = setInterval(
      async () => {
        if (!pb.authStore.isValid) {
          redirect({ to: "/login" });
        }
        await pb.collection("users").authRefresh();
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full">
      <Navbar />
      <div className="w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
