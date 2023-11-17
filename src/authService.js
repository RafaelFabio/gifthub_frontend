const API_URL = import.meta.env.VITE_BACKEND_URL;
const TOKEN_KEY = 'SECRET_KEY';

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al iniciar sesión: ${errorData.message}`);
        }

        const data = await response.json();
        localStorage.setItem(TOKEN_KEY, data.token);
        return data.token;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al registrar usuario: ${errorData.message}`);
        }

        const data = await response.json();
        localStorage.setItem(TOKEN_KEY, data.token);
        return data.token;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
    return !!getToken(); 
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};