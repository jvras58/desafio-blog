export async function fetchPosts(token: string, userId?: string) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
        const url = new URL(`${API_URL}/posts`);
        if (userId) {
            url.searchParams.append('userId', userId);
        }

        const resp = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!resp.ok) {
            throw new Error(await resp.text());
        }
        return await resp.json();
    } catch (err) {
        console.error("Erro fetch:", err);
        throw err;
    }
}