import MetricCards from "@/components/MetricCards";
import { Weather } from "@/components/weather";
import { pb } from "@/data/pocketbase";
import { useCurrentTasks, useTodaysTasks } from "@/hooks/tasks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const userId = pb.authStore.record?.id || "";
  const pendingTasks = useCurrentTasks(userId);
  const todaysTasks = useTodaysTasks(userId);
  const user = pb.authStore.record;

  const defineDayPeriod = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Bom dia";
    if (hour >= 12 && hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        {defineDayPeriod()}, {user?.name}
      </h1>
      <Weather />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 pt-6">
        <MetricCards
          amount={pendingTasks.data?.length || 0}
          title="Pendentes"
          to={{
            to: "/tasks",
            search: {
              status: "pending",
            },
          }}
        />
        <MetricCards
          amount={todaysTasks.data?.length || 0}
          title="Hoje"
          to={{
            to: "/tasks",
            search: {
              dueDate: "today",
            },
          }}
        />
      </div>
    </div>
  );
}
