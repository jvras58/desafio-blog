import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { prisma } from "./lib/db";
import { findUserByEmail } from "./services";

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
			if (account) {
				return true;
			}
			if (user.email) {
				const registeredUser = await findUserByEmail(user?.email);
				if (!registeredUser?.emailVerified) return false;
			}
			return true;
		},
		async jwt({ token, user, trigger, session }) {
			if (trigger && trigger === "update" && session) {
				return token;
			}
			if (user) {
				const dbUser = user.email ? await findUserByEmail(user.email) : null;
				token.role = dbUser?.role ?? UserRole.DEFAULT
			}
			return token;
		},
		session({ session, token }) {
			if (session.user && token.sub) {
				session.user.id = token.sub;
			}
			return {
				...session,
				user: {
					...session.user,
					role: token.role,
				},
			};
		},
	},
	...authConfig,
});
