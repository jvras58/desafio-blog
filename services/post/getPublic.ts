export async function fetchPostsPublic() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
        const url = new URL(`${API_URL}/posts/public`);

        const resp = await fetch(url, {
            method: 'GET',
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