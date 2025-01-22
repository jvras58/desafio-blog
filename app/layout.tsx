import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vlab - Blog",
  description: "Blog desafio Vlab",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
