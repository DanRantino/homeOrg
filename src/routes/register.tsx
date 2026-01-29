import InputControl from "@/components/form/input-control";
import { PasswordInput } from "@/components/form/PasswordInput";
import { errorToast, successToast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { pb } from "@/data/pocketbase";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

const registerSchema = z.object({
  email: z
    .email({
      error: "Email invalido",
    })
    .nonempty({
      error: "Email obrigatorio",
    }),
  name: z.string().min(2, {
    error: "Nome deve ter no minimo 2 caracteres",
  }),
  password: z.string().min(7, {
    error: "Senha deve ter no minimo 8 caracteres",
  }),
  passwordConfirm: z.string().min(7, {
    error: "Senha deve ter no minimo 8 caracteres",
  }),
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      email: "danielaugustofurst@hotmail.com",
      name: "Daniel Furst",
      password: "1234567",
      passwordConfirm: "1234567",
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await pb.collection("users").create({
          body: {
            email: value.email,
            name: value.name,
            password: value.password,
            passwordConfirm: value.passwordConfirm,
          },
        });
      } catch (error) {
        errorToast({
          title: "Erro ao registrar",
          description: error instanceof Error ? error.message : String(error),
        });
        return;
      }
      await pb.collection("users").requestVerification("test@example.com");
      successToast({
        title: "Registrado com sucesso",
        description: "Verifique seu email para confirmar sua conta",
      });
    },
  });

  return (
    <Card className="w-1/4 min-w-2xl">
      <CardHeader className="flex items-center flex-col">
        <CardTitle>Criar Conta</CardTitle>
        <CardDescription>Crie sua conta</CardDescription>
      </CardHeader>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit();
        }}
      >
        <CardContent>
          <form.Field
            name="name"
            children={(field) => {
              return (
                <InputControl
                  label="Name"
                  error={field.state.meta.errors[0]?.message || null}
                >
                  <Input
                    aria-invalid={!!field.state.meta.errors.length}
                    id="name"
                    type="text"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.setValue(e.target.value)}
                  />
                </InputControl>
              );
            }}
          />
          <form.Field
            name="email"
            children={(field) => {
              return (
                <InputControl
                  label="Email"
                  error={field.state.meta.errors[0]?.message || null}
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
            children={(field) => {
              return (
                <InputControl
                  label="Password"
                  error={field.state.meta.errors[0]?.message || null}
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
          <form.Field
            name="passwordConfirm"
            validators={{
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue("password")) {
                  return "Passwords do not match";
                }
                return undefined;
              },
              onChangeListenTo: ["password"],
            }}
            children={(field) => {
              let msg: string | null =
                field.state.meta.errors[0]?.toString() || null;
              if (msg === "[object Object]") msg = null;
              return (
                <InputControl label="Confirm Password" error={msg ? msg : null}>
                  <Input
                    aria-invalid={!!field.state.meta.errors.length}
                    id="passwordConfirm"
                    type="password"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.setValue(e.target.value)}
                  />
                </InputControl>
              );
            }}
          />
          <p></p>
        </CardContent>
        <CardFooter>
          <CardAction className="flex gap-2 justify-evenly w-full">
            <Button type="submit" disabled={form.state.isSubmitting}>
              {form.state.isSubmitting ? "Registrando..." : "Registrar"}
            </Button>
          </CardAction>
        </CardFooter>
      </form>
    </Card>
  );
}
