import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../authService';
import Navigation from '../navigation/Navigation';

import './adminDash.css';

function AdminDashboard() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setUserList(users);
      // console.log('Usuarios obtenidos:', users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className='admin-container'>
      <Navigation />
      <div className='user-list'>
        <h2>Panel de Administrador</h2>
        <ul>
          {userList.map((user) => (
            <li key={user.id}>
              @{user.username}{' '}
              <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
