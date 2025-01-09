import type { ConfigRoutes } from "@/types/routes";

export const configRoutes: ConfigRoutes = {
	publicRoutes: [
		"/",
		"/docs",
		"/auth/login",
		"/auth/register",
		"/auth/change-password",
		"/auth/reset-password",
		"/auth/users",
	],
	authRoutes: ["/api/auth/signin"],
	apiRoutes: ["/api/protected-api"],
	protectedRoutes: [
		"/auth/settings",
		"/example/editable-content",
		"/example/multi-step-form/campaign",
		"/dashboard",
		"/posts",
		"/posts/new",
		"/categories",
		"/tags",
		"/auth/users",
	],
};
