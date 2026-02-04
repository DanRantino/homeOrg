import InputControl from "@/components/form/input-control";
import { PasswordInput } from "@/components/form/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { pb } from "@/data/pocketbase";
import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { GithubIcon, Webhook } from "lucide-react";
import * as z from "zod";
import { successToast } from "./toast";

const LoginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const LoginForm = () => {
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
    <Card className="glass-effect w-full max-w-110 rounded-xl p-8 shadow-2xl relative z-10 ">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit();
        }}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4 text-center text-card-foreground opacity-100">
            <h1 className="text-white">Bem vindo de volta</h1>
          </CardTitle>
          <CardDescription className="text-center mb-6 text-card-foreground opacity-100">
            Entre em seu conta Domus para gerenciar sua moradia.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center ">
            <form.Field
              name="email"
              children={(field) => {
                return (
                  <InputControl
                    error={field.getMeta().errors[0]?.message || null}
                    label="Email"
                  >
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
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
                    error={field.getMeta().errors[0]?.message || null}
                    label="Senha"
                    rightTopLabel={
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Esqueceu a senha?
                      </Link>
                    }
                  >
                    <PasswordInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.setValue(e.target.value)}
                    />
                  </InputControl>
                );
              }}
            />
          </div>
        </CardContent>
        <CardAction className="w-full px-6">
          <Button
            type="submit"
            className="w-full"
            disabled={form.state.isSubmitting}
          >
            {form.state.isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-[#344065]"></div>
            <span className="px-4 text-slate-500 text-xs uppercase tracking-widest font-semibold">
              Ou
            </span>
            <div className="flex-1 border-t border-[#344065]"></div>
          </div>
          <div className="flex justify-between gap-3">
            <Button className="w-1/2">
              <Webhook className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button className="w-1/2">
              <GithubIcon className="mr-2 h-4 w-4" />
              Git Hub
            </Button>
          </div>
          <div className="p-4 text-center text-sm text-card-foreground mt-4 opacity-100">
            <span>
              Ainda não tem conta?
              <Link className="text-primary hover:underline" to="/register">
                {" "}
                Crie uma conta
              </Link>
            </span>
          </div>
        </CardAction>
      </form>
    </Card>
  );
};
