import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/_authed/tasks")({
  validateSearch: z.object({
    status: z.enum(["today", "pending", "delayed", "done"]),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authed/tasks"!</div>;
}
