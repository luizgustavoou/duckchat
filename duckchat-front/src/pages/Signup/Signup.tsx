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
import {
  authSelector,
  resetMessage,
  signin,
  signup,
} from "@/slices/auth-slice";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/useAppSelector";

const formSchema = z.object({
  firstName: z.string().min(3, {
    message: "O primeiro nome deve ter pelo menos 3 caracteres",
  }),
  lastName: z.string().min(3, {
    message: "O último nome deve ter pelo menos 3 caracteres",
  }),
  username: z.string().min(3, {
    message: "O username deve ter pelo menos 3 caracteres",
  }),
  password: z.string().min(3, {
    message: "A senha deve ter pelo menos 3 caracteres",
  }),
  confirmPassword: z.string(),
});

function Signin() {
  const { toast } = useToast();

  const { status: authStatus, message: authMessage } =
    useAppSelector(authSelector);

  const dispatch = useAppDispatch();
  const refContainer = useRef<HTMLDivElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(
      formSchema.refine((data) => data.password === data.confirmPassword, {
        message: "Senhas não correspondem",
        path: ["confirmPassword"],
      })
    ),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { firstName, lastName, username, password, confirmPassword } = values;

    await dispatch(signup({ firstName, lastName, username, password }));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  useEffect(() => {
    if (authStatus !== "error") return;

    const newToast = toast({
      variant: "destructive",
      title: "Erro ao efetuar cadastro",
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
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8  ">
            <h1 className="text-center font-semibold text-2xl">Registrar</h1>
            <p className="text-muted-foreground">
              Registre-se para poder desfrutar das funcionalides do sistema
            </p>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primeiro Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Primeiro Nome"
                      {...field}
                      autoComplete="current-firstName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primeiro Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Último Nome"
                      {...field}
                      autoComplete="current-lastName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      type="password"
                      autoComplete="current-confirmPassword"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Registrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Signin;
