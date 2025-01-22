// TODO: Modificado aqui: 
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { findUserByEmail } from "./services"
// Your own logic for dealing with plaintext password strings; be careful!
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      
      authorize: async (credentials) => {
        let user = null
 
        // logic to salt and hash password
 
        // logic to verify if the user exists
        console.log(credentials.email)
        user = await findUserByEmail(credentials.email as string)
        console.log(user)
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
})