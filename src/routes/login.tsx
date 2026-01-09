import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { UserType } from "@/types/user";
import client from "@/data/client";
import InputControl from "@/components/form/input-control";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/form/PasswordInput";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  validateSearch: (search: { redirect?: string }) => ({
    redirect: search.redirect,
  }),
});

function RouteComponent() {
  const defaultUser: UserType = {
    email: "",
    id: "",
    name: "",
    avatarUrl: "",
    password: "",
  };

  const form = useForm({
    defaultValues: defaultUser,
    onSubmit: async ({ value }) => {
      if (!value.email || !value.password) {
        throw new Error("Email and password are required");
      }
      const response = client
        .collection("users")
        .authWithPassword(value.email, value.password);
      return response;
    },
  });

  return (
    <Card className="w-1/4">
      <CardHeader className="flex items-center flex-col">
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Acesse sua casa e suas tarefas</CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <CardContent>
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value ? "Email is required" : undefined,
            }}
            children={(field) => {
              return (
                <InputControl
                  label="Email"
                  error={field.state.meta.errors.join(", ") || null}
                >
                  <Input
                    aria-invalid={!!field.state.meta.errors.length}
                    id="email"
                    type="email"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.setValue(e.target.value)}
                  />
                </InputControl>
              );
            }}
          />
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                !value ? "Password is required" : undefined,
            }}
            children={(field) => {
              return (
                <InputControl
                  label="Password"
                  error={field.state.meta.errors.join(", ") || null}
                >
                  <PasswordInput
                    aria-invalid={!!field.state.meta.errors.length}
                    id="password"
                    type="password"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.setValue(e.target.value)}
                  />
                </InputControl>
              );
            }}
          />
        </CardContent>
        <CardFooter>
          <CardAction className="flex flex-col">
            <Button type="submit" disabled={form.state.isSubmitting}>
              {form.state.isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
            <div>
              <Button asChild variant="link">
                <Link to="/forgot-password">Esqueci minha senha</Link>
              </Button>
              <Button asChild variant="link">
                <Link to="/register">Criar conta</Link>
              </Button>
            </div>
          </CardAction>
        </CardFooter>
      </form>
    </Card>
  );
}
