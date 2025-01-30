"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { z } from "zod"
import { createContentGenAi, type promptUserDTO } from "@/services/genAi/post"

// TODO: Refactor retirar daqui e colocar no schema
const chatbotSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  content: z.string().min(1, "Conteúdo é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  tags: z.string().min(1, "Tags são obrigatórias"),
})

type ChatbotFormData = z.infer<typeof chatbotSchema>

const INITIAL_DATA: ChatbotFormData = {
  title: "",
  description: "",
  content: "",
  category: "",
  tags: "",
}

export function ChatbotPostGeneratorModal() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<ChatbotFormData | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatbotFormData>({
    resolver: zodResolver(chatbotSchema),
    defaultValues: INITIAL_DATA,
  })

  const onSubmit = async (data: ChatbotFormData) => {
    if (!session?.user?.accessToken) {
      toast.error("Você precisa estar autenticado para gerar um post")
      return
    }

    try {
      setIsGenerating(true)

      const promptData: promptUserDTO = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        content: data.content,
        category: data.category,
        tags: data.tags.split(",").map((tag) => tag.trim()),
      }

      const result = await createContentGenAi(promptData, session.user.accessToken)

      const generatedPost = {
        title: result.title,
        description: result.description,
        content: result.content,
        category: result.category,
        tags: result.tags.join(", "),
      }

      setGeneratedContent(generatedPost)
      localStorage.setItem("generatedPost", JSON.stringify(generatedPost))
      toast.success("Post gerado com sucesso e salvo no localStorage!")
    } catch (error) {
      console.error("Erro ao gerar post:", error)
      toast.error("Erro ao gerar post. Tente novamente.")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Conteúdo copiado para a área de transferência!")
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      reset(INITIAL_DATA)
      setGeneratedContent(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Gerar Post com IA</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Gerador de Postagem</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("title")} placeholder="Título" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

          <Textarea {...register("description")} placeholder="Descrição" />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

          <Textarea {...register("content")} placeholder="Conteúdo" />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

          <Input {...register("category")} placeholder="Categoria" />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

          <Input {...register("tags")} placeholder="Tags (separadas por vírgula)" />
          {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}

          <Button type="submit" disabled={isGenerating}>
            {isGenerating ? "Gerando..." : "Gerar Post"}
          </Button>
        </form>

        {generatedContent && (
          <div className="mt-8 space-y-4">
            <h3 className="font-bold">Conteúdo Gerado:</h3>
            {Object.entries(generatedContent).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <h4 className="font-semibold capitalize">{key}:</h4>
                <p className="max-h-40 overflow-y-auto">{value}</p>
                <Button onClick={() => copyToClipboard(value)} size="sm">
                  Copiar
                </Button>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

