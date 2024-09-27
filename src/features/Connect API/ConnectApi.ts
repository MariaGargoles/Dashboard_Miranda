const API_URL = import.meta.env.VITE_API_URL;

export async function ApiConnect(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data: any = null) {
    const token = localStorage.getItem('TOKEN_KEY');

    // Verificar si el token existe
    if (!token) {
        console.error('Token not found');
        throw new Error('No authentication token found');
    }

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined
        });

        // Manejar errores de respuesta
        if ([401, 403].includes(response.status)) {
            localStorage.clear();
            location.reload();
            return;
        } else if (!response.ok) {
            const errorText = await response.text(); // Obtener el mensaje de error de la respuesta
            throw new Error(errorText || 'Request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API connection error:', error); // Log de error
        throw error; 
    }
}

export async function login(user: { email: string; password: string }) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to login');
        }

        const data = await response.json();
        localStorage.setItem('TOKEN_KEY', data.Token); // Guardar el token en localStorage
        localStorage.setItem('user', JSON.stringify(data.User)); // Guardar información del usuario

        return data.User;
    } catch (error) {
        throw error;
    }
}
