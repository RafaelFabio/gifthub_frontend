import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, updateUserInfo, getToken, decodeToken } from '../authService';
import './Profile.css';
import Navigation from '../navigation/Navigation';

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [editField, setEditField] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = getToken();
        const decoded = await decodeToken(token);
        const user_id = decoded["sub"];
        const user = await getUserInfo(user_id);
        setUserInfo(user);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEdit = (fieldName) => {
    setEditField(fieldName);
  };

  const handleSave = async () => {
    try {
      const updatedUser = { ...userInfo };

      // Si está editando la contraseña, actualiza el campo correspondiente
      if (editField === 'password') {
        updatedUser.password = newPassword;
      }

      await updateUserInfo(userInfo.id, updatedUser);
      setEditField('');
      setNewPassword('');
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Si está editando la contraseña, actualiza el estado correspondiente
    if (name === 'password') {
      setNewPassword(value);
    }

    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: name === 'dob' ? new Date(value).toISOString().split('T')[0] : value,
    }));
  };

  return (
    <div className="profile-container">
        <Navigation />
      <div className="profile-form">
      <h2>Edita tu perfil</h2>
      <div>
        <label>Nombre de Usuario:</label>
        <div>{userInfo.username}</div>
      </div>
      <div>
        <label>Nombre:</label>
        {editField === 'name' ? (
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
          />
        ) : (
          <div>{userInfo.name}</div>
        )}
        <button onClick={() => handleEdit('name')}>Editar</button>
        {editField === 'name' && (
          <button onClick={handleSave}>Guardar</button>
        )}
      </div>
      <div>
        <label>Correo electrónico:</label>
        {editField === 'email' ? (
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
        ) : (
          <div>{userInfo.email}</div>
        )}
        <button onClick={() => handleEdit('email')}>Editar</button>
        {editField === 'email' && (
          <button onClick={handleSave}>Guardar</button>
        )}
      </div>
      {/* <div>
        <label>Fecha de Nacimiento:</label>
        {editField === 'dob' ? (
          <input
            type="date"
            name="dob"
            value={userInfo.birth_date}
            onChange={handleInputChange}
          />
        ) : (
          <div>{userInfo.birth_date}</div>
        )}
        <button onClick={() => handleEdit('dob')}>Editar</button>
        {editField === 'dob' && (
          <button onClick={handleSave}>Guardar</button>
        )}
      </div> */}
      <div>
        <label>Contraseña:</label>
        {editField === 'password' ? (
          <input
            type="password"
            name="password"
            value={newPassword}
            onChange={handleInputChange}
          />
        ) : (
          <div>********</div>
        )}
        <button onClick={() => handleEdit('password')}>Editar</button>
        {editField === 'password' && (
          <button onClick={handleSave}>Guardar</button>
        )}
      </div>
      <button id="volverboton" onClick={() => navigate('/principal')}>Volver</button>
    </div>
    </div>
  );
}

export default Profile;
