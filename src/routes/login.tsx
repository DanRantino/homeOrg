import { LoginForm } from "@/components/login.form";
import { LoginHeader } from "@/components/Login.Header";
import { successToast } from "@/components/toast";
import { pb } from "@/data/pocketbase";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as z from "zod";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  ssr: false,
});

const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

function RouteComponent() {
  const navigate = useNavigate();

  const form = useForm({
    defaultState: {
      values: {
        email: "",
        password: "",
      },
    },
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      await pb
        .collection("users")
        .authWithPassword(value.email, value.password);
      successToast({
        title: "Sucesso",
        description: "Login realizado com sucesso",
      });
      await navigate({ to: "/home" });
    },
  });

  return (
    <div className="h-screen w-full bg-background">
      <LoginHeader />
      <div className="w-full flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
}
