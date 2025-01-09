"use server";

import { signIn } from "@/auth";
import { CredentialsSchema } from "@/schemas/auth";
import { findUserByEmail } from "@/services";
import { AuthError, CredentialsSignin } from "next-auth";
import type { z } from "zod";

/**
 * This method is responsible for executing the login flow.
 * @param {z.infer<typeof CredentialsSchema>} credentials - The user credentials.
 * @returns {Promise<{ error?: string, success?: string, data?: { twoFactorAuthEnabled: boolean } }>}
 * An object containing error, success, or data about two-factor authentication status,
 * or throws an error if an unexpected error occurs.
 */
export const login = async (credentials: z.infer<typeof CredentialsSchema>) => {
    const validCredentials = await CredentialsSchema.safeParse(credentials);
    if (!validCredentials.success) {
        return {
            error: "Dados inválidos",
        };
    }

    try {
        const { email, password } = validCredentials.data;
        const user = await findUserByEmail(email);
        if (!user) {
            return {
                error: "Usuário não encontrado",
            };
        }
        
        const resp = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (resp.error) {
            return {
                error: "Falha ao fazer login",
            };
        }

        return {
            success: "Login bem-sucedido",
        };
    } catch (err) {
        if (err instanceof AuthError) {
            if (err instanceof CredentialsSignin) {
                return {
                    error: "Credenciais inválidas",
                };
            }
        }

        throw err;
    }
};