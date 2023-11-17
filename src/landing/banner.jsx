import React, { useState } from 'react';
import './banner.css';

function Banner() {
    const [loginError, setLoginError] = useState(null); // Nuevo estado para manejar mensajes de error en el inicio de sesión

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            // Lógica para el inicio de sesión, aún por implementar
            setLoginError(null); // Limpiar el mensaje de error si no hay errores
        } catch (error) {
            console.error(error.message);
            setLoginError(error.message); // Establecer el mensaje de error en el estado
        }
    };

    return (
        <div className='banner' id='banner'>
            <div className='banner-text'>
                <span className="font-link">
                    <h1>GiftHub</h1>
                </span>
                <h2>La nueva forma de regalar</h2>
                <p>¡Regístrate y conecta con todos tus amigos!</p>
            </div>
            <div className='login-form'>
                <div className="bubble">
                    <form onSubmit={handleLogin}>
                        <h2>Iniciar sesión</h2>
                        {loginError && <div className="error-message">{loginError}</div>} {/* Muestra el mensaje de error si existe */}
                        <label htmlFor="username">Usuario:</label>
                        <input type="text" id="username" name="username" />

                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" />

                        <button type="submit">Iniciar sesión</button>
                    </form>
                    <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
                </div>
            </div>
        </div>
    );
}

export default Banner;

