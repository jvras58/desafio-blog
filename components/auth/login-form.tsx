"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import AuthCard from "./auth-card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import AuthFormMessage from "./auth-form-message";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function onSubmit(values: LoginFormValues) {
    setIsPending(true);
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    setIsPending(false);

    if (result?.error) {
      setError("Falha no login: " + result.error);
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <AuthCard title="Conecte-se" description="Seja bem-vindo novamente">
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="voce@provedor.com.br"
                        required
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription className="hidden">Seu e-mail</FormDescription>
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
                        type="password"
                        placeholder="******"
                        required
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription className="hidden">Sua senha</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <AuthFormMessage type="error" message={error} title="Erro" />
              )}
              <Button variant="default" className="w-full" disabled={isPending}>
                <LoaderIcon className={!isPending ? "hidden" : "animate-spin mr-2"} />
                <span>Conectar</span>
              </Button>
            </div>
          </form>
        </Form>
        <Separator />
        <div className="mt-4 text-center text-sm">
          Não tem uma conta?{" "}
          <Link href="/auth/register" className="underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
