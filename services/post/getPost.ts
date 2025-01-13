export async function fetchPosts(token: string) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
        const resp = await fetch(`${API_URL}/posts`, {
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
