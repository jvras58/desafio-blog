"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
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
  const [step, setStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const { register, handleSubmit, setValue, watch, reset } = useForm<ChatbotFormData>({
    resolver: zodResolver(chatbotSchema),
    defaultValues: INITIAL_DATA,
  })

  const questions = [
    "Qual título você tem em mente para a postagem?",
    "Descreva brevemente o conteúdo da postagem:",
    "Qual o conteúdo principal da postagem?",
    "Em qual categoria esta postagem se encaixa?",
    "Quais tags você gostaria de associar a esta postagem? (separadas por vírgula)",
  ]

  const onSubmit = async (data: ChatbotFormData) => {
    if (!session?.user?.accessToken) {
      toast.error("Você precisa estar autenticado para gerar um post")
      return
    }

    if (step < questions.length - 1) {
      setStep(step + 1)
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

      setValue("title", result.title)
      setValue("description", result.description)
      setValue("content", result.content)
      setValue("category", result.category)
      setValue("tags", result.tags.join(", "))

      toast.success("Post gerado com sucesso!")
      setStep(questions.length)
    } catch (error) {
      console.error("Erro ao gerar post:", error)
      toast.error("Erro ao gerar post. Tente novamente.")
    } finally {
      setIsGenerating(false)
    }
  }

  const currentValue = watch(questions[step].toLowerCase().split(" ")[0] as keyof ChatbotFormData)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      reset(INITIAL_DATA)
      setStep(0)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Gerar Post com IA</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Gerador de Postagem</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step < questions.length ? (
            <>
              <p>{questions[step]}</p>
              {step === 2 ? (
                <Textarea
                  {...register(questions[step].toLowerCase().split(" ")[0] as keyof ChatbotFormData)}
                  placeholder="Digite aqui..."
                />
              ) : (
                <Input
                  {...register(questions[step].toLowerCase().split(" ")[0] as keyof ChatbotFormData)}
                  placeholder="Digite aqui..."
                />
              )}
            </>
          ) : (
            <>
              <h3 className="font-bold">Conteúdo Gerado:</h3>
              <div>
                <h4>Título:</h4>
                <p>{watch("title")}</p>
              </div>
              <div>
                <h4>Descrição:</h4>
                <p>{watch("description")}</p>
              </div>
              <div>
                <h4>Conteúdo:</h4>
                <p>{watch("content")}</p>
              </div>
              <div>
                <h4>Categoria:</h4>
                <p>{watch("category")}</p>
              </div>
              <div>
                <h4>Tags:</h4>
                <p>{watch("tags")}</p>
              </div>
            </>
          )}
          <Button type="submit" disabled={isGenerating || !currentValue}>
            {step < questions.length - 1 ? "Próximo" : step === questions.length - 1 ? "Gerar Post" : "Salvar Post"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

