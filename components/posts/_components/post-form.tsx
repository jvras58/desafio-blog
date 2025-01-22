'use client'
// TODO: Pedir ajuda ao gpt para refatorar isso:
import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BasicInfoStep } from "./steps/basic-info-step"
import { ContentStep } from "./steps/content-step"
import { CategorizationStep } from "../_components/steps/categorization-step"
import { postSchema, type PostFormData } from "@/schemas/post"
import type { CreatePostDTO } from "../../../types/post"
import { createPost } from "@/services/post/post"
import { toast } from "sonner"

const INITIAL_DATA: PostFormData = {
  title: "",
  description: "",
  content: "",
  category: "",
  tags: [],
}

const steps = [
  {
    title: "Informações Básicas",
    component: BasicInfoStep,
    fields: ["title", "description"],
  },
  {
    title: "Conteúdo", 
    component: ContentStep,
    fields: ["content"],
  },
  {
    title: "Categorização",
    component: CategorizationStep,
    fields: ["category", "tags"],
  },
]

export function PostForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: INITIAL_DATA,
    mode: "onChange",
  })

  const { handleSubmit, trigger } = form

  const nextStep = async () => {
    const fields = steps[currentStep].fields
    const isValid = await trigger(fields as (keyof PostFormData)[])
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const onSubmit = async (data: PostFormData) => {
    if (!session?.user?.accessToken) {
      toast.error("Você precisa estar autenticado para criar um post")
      return
    }

    try {
      setIsSubmitting(true)
      const createPostData: CreatePostDTO = {
        title: data.title,
        description: data.description,
        content: data.content,
        category: data.category,
        tags: data.tags,
      }
      await createPost(createPostData, session.user.accessToken)
      
      toast.success("Post criado com sucesso!")
      router.push('/posts')
      router.refresh()
    } catch (error) {
      console.error("Erro ao criar post:", error)
      toast.error("Erro ao criar post. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] mt-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Postagem</h1>
          <p className="text-muted-foreground">Digite as informações da postagem</p>
        </div>

        <div className="grid md:grid-cols-[200px,1fr] gap-6 items-start">
          <nav className="space-y-1">
            {steps.map((step, index) => (
              <button
                key={step.title}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-lg transition-colors",
                  currentStep === index
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setCurrentStep(index)}
              >
                {step.title}
              </button>
            ))}
          </nav>

          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-card rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {steps[currentStep].title}
                </h2>
                
                <CurrentStepComponent />

                <div className="flex justify-end space-x-2 mt-6">
                  {currentStep > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                    >
                      Voltar
                    </Button>
                  )}
                  
                  {currentStep < steps.length - 1 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                    >
                      Próximo
                    </Button>
                  ) : (
                    <Button type="submit">
                      Criar Post
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

