import React, { useState, useEffect } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { getUserInfo, getToken, decodeToken } from '../authService';

const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // Obtener la información del usuario
        const token = getToken();
        const decoded = await decodeToken(token);
        const user_id = decoded["sub"];
        const userInfo = await getUserInfo(user_id);

        // Verificar si el usuario tiene el rol de "admin"
        const userIsAdmin = userInfo.role === 'admin';
        setIsAdmin(userIsAdmin);
      } catch (error) {
        console.error('Error al verificar el estado de administrador:', error);
        setIsAdmin(false); // En caso de error, consideramos que no es admin
      }
    };

    // Verificar el estado de administrador al cargar el componente
    checkAdminStatus();
  }, []);

  if (isAdmin === null) {
    // El estado aún no se ha determinado, puedes mostrar un componente de carga o lo que prefieras
    return <div>Cargando...</div>;
  }

  // Si el usuario es un administrador, renderiza el elemento (vista), de lo contrario, redirige a la página de inicio
  return isAdmin ? <Outlet /> : <Navigate to="/landing" />;
};

export default AdminRoute;
