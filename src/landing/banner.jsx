import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../authService'; 
import './banner.css';

function Banner() {
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate()
    
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const email = event.target.email.value;
            const password = event.target.password.value;

            const token = await loginUser({ email, password });

            console.log(token);
            localStorage.setItem('jwt', token);

            setLoginError(null);
            navigate('/principal')

        } catch (error) {
            console.error(error.message);
            setLoginError('Contraseña o Email incorrecto, revisa tus credenciales e intentalo denuevo.');
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
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" />

                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" />

                        <button type="submit">Iniciar sesión</button>
                        {loginError && <div className="error-message">{loginError}</div>}
                    </form>
                    <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
                </div>
            </div>
        </div>
    );
}

export default Banner;
