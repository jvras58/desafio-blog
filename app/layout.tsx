"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });


const queryClient = new QueryClient();

export default function RootLayout({
	children,
}:  Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
		<body className={inter.className} suppressHydrationWarning>
				<SessionProvider>
					<QueryClientProvider client={queryClient}>
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
							{children}
							<Toaster />
						</ThemeProvider>
					</QueryClientProvider>
				</SessionProvider>
		</body>
		</html>
);
}
