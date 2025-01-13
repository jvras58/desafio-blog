"use client";

import { PostFormType } from '@/components/posts/_components/multi-step-post-config';
import { createPost } from '@/services/post/postConteudo';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// TODO: a fazer o postConteudo

export function usePostSave() {
const router = useRouter();
const { data: session } = useSession();

return async (values: PostFormType) => {
try {
    if (!session?.user?.accessToken) {
    throw new Error("Você precisa estar autenticado");
    }

    await createPost(
    {
        title: values.title,
        description: values.description,
        content: values.content,
        category: values.category,
        tags: values.tags
    },
    session.user.accessToken
    );

    toast.success("Post criado com sucesso!");
    router.push('/posts');
    router.refresh();

} catch (error) {
    console.error("Erro ao salvar post:", error);
    toast.error("Erro ao criar post. Tente novamente.");
    throw error;
}
};
}