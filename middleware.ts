import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import { configRoutes } from "./config/routes";
import { createRouteMatchers } from "./lib/route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { isPublicRoute, isProtectedRoute, isApiRoute, isAuthRoute } = createRouteMatchers(configRoutes, req);
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;
	console.info(`Public: ${isPublicRoute}`);
	console.info(`Protected: ${isProtectedRoute}`);
	console.info(`Api: ${isApiRoute}`);
	console.info(`Auth: ${isAuthRoute}`);
	if (isProtectedRoute && !isLoggedIn) {
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
