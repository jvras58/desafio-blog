import { Post } from "@/types/post";

export async function updatePost(postId: string, updatedData: Partial<Post>, token: string): Promise<Post> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }

        return await response.json();
    } catch (err) {
        console.error("Erro ao atualizar post:", err);
        throw err;
    }
}