import { useAuthStore } from "@/context/Auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore.getState();

  return (
    <div>
      Hello "/_auth/home"! {user ? `Welcome, ${user.name}!` : "Please log in."}
    </div>
  );
}
