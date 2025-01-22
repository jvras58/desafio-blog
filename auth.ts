import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { prisma } from "./lib/db";
import { findUserByEmail } from "./services";
import { SignJWT } from 'jose';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    unstable_update: update,
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async signIn({ user, account}) {
            // console.log("🔐 SignIn Callback:", { user, account });
            
            if (account) {
                // console.log("📱 Conta OAuth encontrada:", account);
                return true;
            }
            if (user.email) {
                // console.log("📧 Verificando email:", user.email);
                const registeredUser = await findUserByEmail(user?.email);
                // console.log("👤 Usuário encontrado:", registeredUser);
            }
            return true;
        },
        async jwt({ token, user, trigger, session }) {
            // console.log("🎫 JWT Callback:", { token, user, trigger, session });
            
            if (trigger && trigger === "update" && session) {
                console.log("🔄 Token update trigger");
                return token;
            }
            if (user) {
                // console.log("👤 Buscando usuário no banco");
                const dbUser = user.email ? await findUserByEmail(user.email) : null;
                // console.log("📄 Dados do usuário:", dbUser);
                token.role = dbUser?.role ?? UserRole.DEFAULT;
            	// Criar um JWT assinado para uso como Bearer token
				const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
				const bearerToken = await new SignJWT({
					sub: token.sub,
					email: token.email,
					name: token.name,
					role: token.role
				})
				.setProtectedHeader({ alg: 'HS256' })
				.setIssuedAt()
				.setExpirationTime('24h')
				.sign(secret);

				token.accessToken = bearerToken;
			}
			// Adicionando o token completo
            return token;
        },
        session({ session, token }) {
            // console.log("📍 Session Callback:", { session, token });
            
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            const enhancedSession = {
                ...session,
                user: {
                    ...session.user,
                    role: token.role,
					accessToken: token.accessToken
                },
            };
            // console.log("✅ Sessão final:", enhancedSession);
            return enhancedSession;
        },
    },
    ...authConfig,
});