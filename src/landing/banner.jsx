import './banner.css';

function Banner() {
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
                    <form>
                        <h2>Iniciar sesión</h2>
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
