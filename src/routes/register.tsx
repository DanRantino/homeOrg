import client from "@/data/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const logIn = async (
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    if (password !== passwordConfirm) {
      throw new Error("Passwords do not match");
    }
    client.collection("users").create({ email, password, passwordConfirm });
  };

  return <div>Hello "/register"!</div>;
}
