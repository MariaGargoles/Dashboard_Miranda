export async function ApiConnect(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data: any = null) {
    const token = localStorage.getItem('TOKEN_KEY');
    const API_URL = import.meta.env.VITE_API_URL;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API connection error:', error);
        throw error;
    }
}
