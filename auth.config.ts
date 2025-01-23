import { hash, compare } from "bcrypt-ts";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { InvalidCredentials, UserNotFound } from "./lib/auth";
import { CredentialsSchema } from "./schemas/auth";
import { findUserByEmail } from "./services";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedCredentials = CredentialsSchema.safeParse(credentials);
                if (validatedCredentials.success) {
                    const { email, password } = validatedCredentials.data;
                    const user = await findUserByEmail(email);
                    if (!user || !user.password) {
                        throw new UserNotFound();
                    }
                    const validPassword = await compare(password, user.password);
                    if (validPassword) return user;
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;