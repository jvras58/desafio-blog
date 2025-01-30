"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"

import { createContentGenAi, type promptUserDTO } from "@/services/genAi/post"
import { chatbotSchema, type ChatbotFormData } from "@/schemas/post"

const INITIAL_DATA: ChatbotFormData = {
  title: "",
  description: "",
  content: "",
  category: "",
  tags: "",
}

export function ChatbotPostGeneratorModal() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ChatbotFormData>({
    resolver: zodResolver(chatbotSchema),
    defaultValues: INITIAL_DATA,
  })

  useEffect(() => {
    const savedPost = localStorage.getItem("generatedPost")
    if (savedPost) {
      const parsedPost = JSON.parse(savedPost)
      Object.entries(parsedPost).forEach(([key, value]) => {
        setValue(key as keyof ChatbotFormData, value as string)
      })
    }
  }, [setValue])

  const onSubmit = async (data: ChatbotFormData) => {
    if (!session?.user?.accessToken) {
      toast.error("Você precisa estar autenticado para gerar um post")
      return
    }

    try {
      setIsGenerating(true)

      const promptData: promptUserDTO = {
        id: Date.now().toString(),
        title: data.title ?? "",
        description: data.description ?? "",
        content: data.content ?? "",
        category: data.category ?? "",
        tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
      }

      const result = await createContentGenAi(promptData, session.user.accessToken)

      const generatedPost = {
        title: result.title,
        description: result.description,
        content: result.content,
        category: result.category,
        tags: result.tags.join(", "),
      }

      Object.entries(generatedPost).forEach(([key, value]) => {
        setValue(key as keyof ChatbotFormData, value)
      })

      localStorage.setItem("generatedPost", JSON.stringify(generatedPost))
      toast.success("Post gerado com sucesso e preenchido no formulário!")
    } catch (error) {
      console.error("Erro ao gerar post:", error)
      toast.error("Erro ao gerar post. Tente novamente.")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (key: keyof ChatbotFormData) => {
    const text = getValues(key) ?? ''
    navigator.clipboard.writeText(text)
    toast.success(`${key} copiado para a área de transferência!`)
  }

  const clearContent = () => {
    reset(INITIAL_DATA)
    localStorage.removeItem("generatedPost")
    toast.success("Conteúdo limpo com sucesso!")
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const FormField = ({
    name,
    placeholder,
    isTextarea,
  }: {
    name: keyof ChatbotFormData
    placeholder: string
    isTextarea?: boolean
  }) => {
    const Component = isTextarea ? Textarea : Input

    return (
      <div className="relative group">
        <Component {...register(name)} placeholder={placeholder} className="pr-8" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
          onClick={() => copyToClipboard(name)}
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copiar {name}</span>
        </Button>
        {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
      </div>
    )
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
          <FormField name="title" placeholder="Título" />
          <FormField name="description" placeholder="Descrição" isTextarea />
          <FormField name="content" placeholder="Conteúdo" isTextarea />
          <FormField name="category" placeholder="Categoria" />
          <FormField name="tags" placeholder="Tags (separadas por vírgula)" />

          <div className="flex justify-between">
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? "Gerando..." : "Gerar Post"}
            </Button>
            <Button type="button" onClick={clearContent} variant="destructive">
              Limpar Conteúdo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

