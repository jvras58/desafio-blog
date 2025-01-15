export async function deletePost(postId: string, token: string): Promise<void> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }
    } catch (err) {
        console.error("Erro ao deletar post:", err);
        throw err;
    }
}