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
    localStorage.setItem(TOKEN_KEY, data.access_token);

    return data.access_token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al eliminar usuario: ${errorData.message}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getUserInfo = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al obtener información del usuario: ${errorData.message}`);
    }

    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserInfo = async (userId, updatedUserData) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al actualizar la información del usuario: ${errorData.message}`);
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getToken = () => {
  // Obtiene el token del almacenamiento local
  const token = localStorage.getItem(TOKEN_KEY);
  // console.log(token);
  return token;
};


export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  // Verifica si el token está presente en el almacenamiento local
  return localStorage.getItem(TOKEN_KEY) !== null;
};

export const decodeToken = async (token) => {
  try {
    const response = await fetch(`${API_URL}/decode/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al decodificar el token: ${errorData.message}`);
    }

    const decoded = await response.json();
    return decoded;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
    });

    if (!response.ok) {
      // Si la respuesta no es exitosa, lanza un error personalizado
      throw new Error(`Error en getUsers: ${response.statusText}`);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    // Manejo de errores
    console.error('Error en getUsers:', error.message);
    throw error;
  }
};
