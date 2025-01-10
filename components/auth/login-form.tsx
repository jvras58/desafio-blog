"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthCard from "./auth-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { login } from "@/actions/auth";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CredentialsSchema } from "@/schemas/auth";
import { LoaderIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "../ui/separator";
import AuthFormMessage from "./auth-form-message";

export default function LoginForm() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const searchParams = useSearchParams();
	const callbackError = searchParams
		? searchParams.get("error") === "OAuthAccountNotLinked"
			? "E-mail em uso com provedor diferente"
			: undefined
		: undefined;
	const form = useForm<z.infer<typeof CredentialsSchema>>({
		resolver: zodResolver(CredentialsSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof CredentialsSchema>) => {
		startTransition(async () => {
			try {
				const resp: { error?: string; success?: string } | undefined = await login(values);

				if (!resp) {
					console.info("Algo deu errado");
					setSuccess("");
					form.reset();
					return;
				}

				if (resp.error) {
					setError(resp.error);
					setSuccess("");
					form.reset();
					return;
				}

				if (resp.success) {
					console.info("Sucesso ao conectar");
					setSuccess(resp.success);
					setError("");
					form.reset();
					router.push(process.env.NEXT_PUBLIC_AUTH_LOGIN_REDIRECT || "/");
					return;
				}

				setError("Algo deu errado");
				setSuccess("");
				form.reset();
			} catch (err) {
				setError("Algo deu errado");
				setSuccess("");
				form.reset();
			}
		});
	};

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
										<FormLabel>{"E-mail"}</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="voce@provedor.com.br"
												required
												{...field}
												disabled={isPending}
											/>
										</FormControl>
										<FormDescription className="hidden">{"Seu e-mail."}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{"Senha"}</FormLabel>
										<FormControl>
											<div>
												<Input type="password" placeholder="******" required {...field} disabled={isPending} />
											</div>
										</FormControl>
										<FormDescription className="hidden">{"Sua senha."}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							{callbackError && <AuthFormMessage type="error" message={callbackError} title="Erro" />}
							{error && <AuthFormMessage type="error" message={error} title="Erro" />}
							{success && <AuthFormMessage type="success" message={success} title="Sucesso" />}
							<Button variant={"default"} className="w-full" disabled={isPending}>
								<LoaderIcon className={!isPending ? "hidden" : "animate-spin mr-2"} />
								<span>{"Conectar"}</span>
							</Button>
						</div>
					</form>
				</Form>

				<Separator />

				<div className="mt-4 text-center text-sm">
					{"Não tem uma conta?"}{" "}
					<Link href="/auth/register" className="underline">
						{"Cadastre-se"}
					</Link>
				</div>
			</div>
		</AuthCard>
	);
}
