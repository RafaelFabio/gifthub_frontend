import './register.css';

function Register() {
    return (
        <div className='register'>
            <div className='register-form'>
                <form>
                    <h2>Regístrate!</h2>
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
