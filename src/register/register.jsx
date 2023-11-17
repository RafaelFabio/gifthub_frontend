import React, { useState } from 'react';
import './register.css';

function Register() {
    const [registerError, setRegisterError] = useState(null); 

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            setRegisterError(null);
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
                    {registerError && <div className="error-message">{registerError}</div>} {/* Muestra el mensaje de error si existe */}
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
