import client from "@/data/client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad() {
    throw redirect({
      to: client.authStore.record ? "/dashboard" : "/login",
    });
  },
  onEnter: () => {
    redirect({
      to: client.authStore.record ? "/dashboard" : "/login",
    });
  },
});
