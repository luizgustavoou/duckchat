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
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RoutesPath } from "@/utils/routes-path";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "O username deve ter pelo menos 3 caracteres",
  }),
  password: z.string(),
});

function Signin() {
  const dispatch = useAppDispatch();
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
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
    </div>
  );
}

export default Signin;
