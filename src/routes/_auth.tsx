import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    // const auth = useAuthStore.getState();
    // if (!auth.isAuthenticated) {
    //   throw redirect({
    //     to: "/login",
    //   });
    // }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return <Outlet />;
}
