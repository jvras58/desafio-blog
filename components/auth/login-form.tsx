// TODO: Tentando corrigir o usessesion seguindo a documentação: (https://authjs.dev/getting-started/authentication/credentials?framework=)
import { signIn } from "@/auth"
 
export default function LoginForm() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("credentials", formData)
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  )
}