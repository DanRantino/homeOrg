import { getAuthSnapshot, initializeAuth } from "@/context/Auth";
import { pb } from "@/data/pocketbase";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    await initializeAuth();
    if (getAuthSnapshot().isAuthenticated) {
      redirect({ to: "/home" });
    } else {
      redirect({ to: "/login" });
    }
  },
  ssr: false,
  component: App,
});

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    void (!pb.authStore.isValid && navigate({ to: "/login" }));
    void (pb.authStore.isValid && navigate({ to: "/home" }));
  }, []);
  return <div>Redirecting...</div>;
}
