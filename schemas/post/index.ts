import { z } from "zod";

export const postSchema = z.object({
    title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
    description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
    content: z.string().min(50, "Conteúdo deve ter pelo menos 50 caracteres"),
    category: z.string().min(1, "Selecione uma categoria"),
    tags: z.array(z.string()).min(1, "Adicione pelo menos uma tag"),
})

export type PostFormData = z.infer<typeof postSchema>

export const chatbotSchema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    description: z.string().optional(),
    content: z.string().optional(),
    category: z.string().optional(),
    tags: z.string().optional(),
  })
export type ChatbotFormData = z.infer<typeof chatbotSchema>
