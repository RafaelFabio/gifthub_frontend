import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../authService';
import './register.css';

function Register() {
    const [registerError, setRegisterError] = useState(null);
    const navigate = useNavigate()

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const username = event.target.username.value;
            const name = event.target.name.value;
            const email = event.target.email.value;
            const birth_date = event.target.birth_date.value;
            const password = event.target.password.value;

            const token = await registerUser({ username, name, email, birth_date, password });

            // console.log(token);


            setRegisterError(null);
            navigate('/landing')
        } catch (error) {
            console.error(error.message);
            setRegisterError('Error en los datos, inténtalo denuevo');
        }
    };

    return (
        <div className='register'>
            <div className='register-form'>
                <form onSubmit={handleRegister}>
                    <h2>Regístrate!</h2>
                    <label htmlFor="username">Usuario:</label>
                    <input type="text" id="username" name="username" />

                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" />

                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" id="email" name="email" />

                    <label htmlFor="birth_date">Fecha de Nacimiento:</label>
                    <input type="date" id="birth_date" name="birth_date" />

                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" />

                    <button type="submit">Registrarse</button>
                    {registerError && <div className="error-message">{registerError}</div>}
                </form>
            </div>
        </div>
    );
}

export default Register;
