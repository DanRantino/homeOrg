import { pb } from "@/data/pocketbase";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad() {
    throw redirect({
      to: pb.authStore.record ? "/dashboard" : "/sign-in",
    });
  },
  onEnter: () => {
    redirect({
      to: pb.authStore.record ? "/dashboard" : "/sign-in",
    });
  },
});
