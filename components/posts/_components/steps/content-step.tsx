import { useFormContext } from "react-hook-form"
import { Editor } from "@/components/ui/step/editor"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import type { PostFormData } from "@/schemas/post"

export function ContentStep() {
  const { control } = useFormContext<PostFormData>()

  return (
    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Conteúdo</FormLabel>
          <FormControl>
            <Editor
              value={field.value}
              onChange={field.onChange}
              className="min-h-[400px] bg-card border-border"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

