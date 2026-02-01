import { pb } from "@/data/pocketbase";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = pb.authStore.record;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Bom dia, {user?.name}</h1>
      <h2>
        {new Intl.DateTimeFormat("pt-BR", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
          .format(new Date())
          .toString()
          .toLocaleUpperCase()}
      </h2>
    </div>
  );
}
