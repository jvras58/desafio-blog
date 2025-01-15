import { useFormContext } from "react-hook-form"
import { X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import type { PostFormData } from "@/schemas/post-schema"

export function CategorizationStep() {
  const { control, watch, setValue } = useFormContext<PostFormData>()
  const tags = watch("tags")

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setValue("tags", [...tags, tag])
    }
  }

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    )
  }

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categoria</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-background border-input">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="tech">Tecnologia</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="business">Negócios</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar tag"
                    className="bg-background border-input"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag((e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ""
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      const input = document.querySelector(
                        'input[placeholder="Adicionar tag"]'
                      ) as HTMLInputElement
                      addTag(input.value)
                      input.value = ""
                    }}
                  >
                    Adicionar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-3 py-1 text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

