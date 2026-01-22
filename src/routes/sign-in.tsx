import InputControl from "@/components/form/input-control";
import { PasswordInput } from "@/components/form/PasswordInput";
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
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { errorToast, successToast } from "@/components/toast";
import { pb } from "@/data/pocketbase";
import { useState } from "react";

export const Route = createFileRoute("/sign-in")({
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
  password: z.string().min(7, {
    error: "Senha deve ter no minimo 8 caracteres",
  }),
});

function RouteComponent() {
  const [isOTP, setIsOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpId, setOtpId] = useState("");

  const navigate = Route.useNavigate();

  const form = useForm({
    defaultValues: {
      email: "danielaugustofurst@hotmail.com",
      password: "1234567",
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await pb.collection("users").authWithPassword(value.email, value.password)
        await pb.collection("users").requestVerification(value.email)
        successToast({
          title: "Sucesso",
          description: "Login realizado com sucesso",
        });
        return navigate({
          to: "/dashboard",
        });
      } catch (e) {
        errorToast({
          title: "Erro",
          description: "Erro ao realizar o login",
        });
      }
    },
  });
  
  const loginWithOTP = async () => {
    const req = await pb.collection("users").requestOTP(form.getFieldValue("email"))
    setOtpId(req.otpId);
  }

  const sendOTPCode = async () => {
    try {
      await pb.collection("users").authWithOTP(otpId, otp);
      successToast({
        title: "Sucesso",
        description: "OTP login realizado com sucesso",
      });
      return navigate({
          to: "/dashboard",
        });
    }
    catch (e) {

    }
    
  }

  return (
    <div className="h-screen flex justify-center items-center flex-1">
      <Card className="w-1/4 min-w-2xl">
        <CardHeader className="flex items-center flex-col">
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Acesse sua casa e suas tarefas</CardDescription>
        </CardHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOTP(false);
            await form.handleSubmit();
          }}
        >
          <CardContent>
             {!isOTP &&
              <><form.Field
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
            </>
          }
          {
            isOTP && <InputControl error={""} label="OTP" >
              <Input type="number" value={otp} onChange={e=>setOtp(e.currentTarget.value)} />
              </InputControl>
          }
          </CardContent>
          <CardFooter>
            <CardAction className="flex gap-2 justify-evenly w-full">
              <Button type="submit" disabled={form.state.isSubmitting}>
                {form.state.isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
              <Button type="button" onClick={(e)=>{
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOTP(true);
                  !isOTP && loginWithOTP();
                  isOTP && sendOTPCode()
                }}>
                OTP Login
              </Button>
              <Button variant="link" asChild>
                <Link to="/register">Criar conta</Link>
              </Button>
            </CardAction>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
