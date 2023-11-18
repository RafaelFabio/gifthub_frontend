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
            const dob = event.target.dob.value;
            const password = event.target.password.value;

            const token = await registerUser({ username, name, email, dob, password });

            console.log(token);


            setRegisterError(null);
            navigate('/landing')
        } catch (error) {
            console.error(error.message);
            setRegisterError(error.message);
        }
    };

    return (
        <div className='register'>
            <div className='register-form'>
                <form onSubmit={handleRegister}>
                    <h2>Regístrate!</h2>
                    {registerError && <div className="error-message">{registerError}</div>}
                    <label htmlFor="username">Usuario:</label>
                    <input type="text" id="username" name="username" />

                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" />

                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" id="email" name="email" />

                    <label htmlFor="dob">Fecha de Nacimiento:</label>
                    <input type="date" id="dob" name="dob" />

                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" />

                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
