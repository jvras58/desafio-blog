declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// DB_USER: string;
			// DB_PASSWORD: string;
			// DB_PORT: string;
			DATABASE_URL: string;
			NEXTAUTH_SECRET: string;
			NEXT_PUBLIC_URL: string;
			VERIFICATION_SUBJECT: string;
			AUTH_LOGIN_REDIRECT: string;
		}
	}
}
export type {};
