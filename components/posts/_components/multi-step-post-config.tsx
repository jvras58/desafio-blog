import type { Form, UseMultiStepFormTypeOptions } from "@/types/multi-step-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";

import buildMultiStepForm from "@/lib/multi-step-form";

// 1 - Schema do formulário
export const PostFormSchema = z.object({
  title: z.string().min(5, "Título deve ter no mínimo 5 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  content: z.string().min(50, "Conteúdo deve ter no mínimo 50 caracteres"),
  category: z.string().min(1, "Categoria é obrigatória"),
  tags: z.array(z.string()).min(1, "Adicione pelo menos uma tag"),
});

// 2 - Tipo do formulário
export type PostFormType = z.infer<typeof PostFormSchema>;

// 3 - Dados iniciais
export const initialFormData: PostFormType = {
  title: "",
  description: "",
  content: "",
  category: "",
  tags: [],
};

// 4 - Função de salvamento
const saveFormData: SubmitHandler<PostFormType> = async (values) => {
  console.log("Salvando post no blog");
  console.log(values);
  // Aqui você implementaria a lógica de salvar no backend
};

// 5 - Definição das etapas
export const forms: Form<PostFormType>[] = [
  { 
    id: 1, 
    label: "Informações Básicas", 
    form: Step1, 
    fields: ["title", "description"] 
  },
  { 
    id: 2, 
    label: "Conteúdo", 
    form: Step2, 
    fields: ["content"] 
  },
  { 
    id: 3, 
    label: "Categorização", 
    form: Step3, 
    fields: ["category", "tags"] 
  },
];

// 6 - Opções iniciais do formulário
const initialFormOptions: UseMultiStepFormTypeOptions<PostFormType> = {
  schema: PostFormSchema,
  currentStep: 0,
  setCurrentStep: (value) => {},
  forms,
  saveFormData,
};

// 7 - Construção do Context e Provider
export const { 
  FormContext: PostFormContext, 
  FormProvider: PostProvider 
} = buildMultiStepForm(
  initialFormOptions,
  PostFormSchema,
  initialFormData,
);