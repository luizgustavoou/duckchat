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
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { authSelector, resetMessage, signin } from "@/slices/auth-slice";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RoutesPath } from "@/utils/routes-path";
import { Link } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "O username deve ter pelo menos 3 caracteres",
  }),
  password: z.string(),
});

function Signin() {
  const { toast } = useToast();

  const { status: authStatus, message: authMessage } =
    useAppSelector(authSelector);

  const dispatch = useAppDispatch();
  const refContainer = useRef<HTMLDivElement | null>(null);

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

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  useEffect(() => {
    if (authStatus !== "error") return;
    const newToast = toast({
      variant: "destructive",
      title: "Erro ao efetuar login",
      description: authMessage,
    });

    const timeout = setTimeout(() => {
      newToast.dismiss();
    }, 2000);

    return () => {
      clearTimeout(timeout);
      newToast.dismiss();
    };
  }, [authStatus]);

  return (
    <div className="h-screen flex justify-center items-center ">
      <div
        className="w-[480px] max-w-full p-5 flex flex-col justify-center items-center gap-5 rounded-sm bg-secondary text-secondary-foreground"
        ref={refContainer}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
            <h1 className="text-center font-semibold text-2xl">Login</h1>
            <p className="text-muted-foreground">
              Entre para poder desfrutar das funcionalides do sistema
            </p>
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
        <p className="text-muted-foreground">
          Não tem uma conta?{" "}
          <Link
            to={RoutesPath.SIGNUP}
            className="text-accent-foreground font-semibold underline"
          >
            Clique aqui
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
