// TODO: Tentando corrigir o usessesion seguindo a documentação: (https://authjs.dev/getting-started/authentication/credentials?framework=)
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { findUserByEmail } from "./services"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
          credentials: {
            email: {},
            password: {},
          },
          authorize: async (credentials) => {
            console.log("Autorizando", { credentials })
            try {
              // Validar formato das credenciais
              if (!credentials?.email || !credentials?.password) {
                console.log("Credenciais faltando", { credentials })
                throw new Error("Email e senha são obrigatórios")
              }
    
              const user = await findUserByEmail(credentials.email as string)
              console.log("Usuário encontrado:", !!user)
    
              if (!user) {
                throw new Error("Email não encontrado")
              }

              // Log do usuário retornado
              const returnUser = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
              }
              console.log("Usuário autenticado:", returnUser)
              
              return returnUser
            } catch (error) {
              console.error("Erro na autenticação:", error)
              throw new Error(error instanceof Error ? error.message : "Erro na autenticação")
            }
          },
        }),
      ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string, 
          name: token.name as string,
          role: token.role as string
        },
      }
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 1 * 60 * 60,
  },
})

// types/next-auth.d.ts
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
    }
  }
}