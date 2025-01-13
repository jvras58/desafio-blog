import { CreatePostDTO, Post } from "@/types/post";

// TODO: a fazer o postConteudo
export async function createPost(post: CreatePostDTO, token: string): Promise<Post> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }

        return await response.json();
    } catch (err) {
        console.error("Erro ao criar post:", err);
        throw err;
    }
}