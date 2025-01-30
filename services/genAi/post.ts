export interface promptUserDTO {
    id: string;
    title: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
}

export async function createContentGenAi(Prompt: promptUserDTO, token: string) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${API_URL}/genAi/chat`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Prompt)
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }

        return await response.json();
    } catch (err) {
        console.error("Erro ao criar Conteudo:", err);
        throw err;
    }
}