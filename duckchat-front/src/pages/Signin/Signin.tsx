import "./Signin.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppNavigate } from "@/hooks/useNavigate";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { authSelector, signin } from "@/slices/auth-slice";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RupesPath } from "@/utils/rupes-path";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "O username deve ter pelo menos 3 caracteres",
  }),
  password: z.string(),
});

function Signin() {
  const dispatch = useAppDispatch();
  const refContainer = useRef<HTMLDivElement | null>(null);

  const { status: authStatus } = useAppSelector(authSelector);

  const navigate = useAppNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, password } = values;

    await dispatch(signin({ username, password }));
  }

  const toSignup = (e) => {
    refContainer.current?.classList.add("active");
  };

  const toSignin = (e) => {
    refContainer.current?.classList.remove("active");
    console.log("i");
  };
  return (
    <div className="h-screen flex justify-center items-center ">
      <div
        className="mycontainer bg-secondary text-secondary-foreground"
        ref={refContainer}
      >
        <div className="form-container sign-in">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <h1>Login</h1>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        autoComplete="current-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Senha"
                        {...field}
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Entrar
              </Button>
            </form>
          </Form>
        </div>
        <div className="form-container sign-up ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <h1>Registrar-se</h1>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        autoComplete="current-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Senha"
                        {...field}
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Entrar
              </Button>
            </form>
          </Form>
        </div>
        <div className="toggle-container ">
          <div className="toggle bg-card/75 text-card-foreground">
            <div className="toggle-panel toggle-left">
              <h1>Bem vindo!</h1>
              <p>
                Insira seus dados pessoais para usar todos os recursos do site
              </p>
              <Button onClick={toSignin}>Login</Button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Olá, amigo!</h1>
              <p>
                Registre-se com seus dados pessoais para usar todos os recursos
                do site
              </p>
              <Button onClick={toSignup}>Registrar-se</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
