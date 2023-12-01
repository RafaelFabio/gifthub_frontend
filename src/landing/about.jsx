import './about.css'
import birthday from '/about-birthday.jpg'

function About() {
    return (
        <div className='about'>
            <div className='about-container' id='about'>
                <div className='col-1'>
                    <h2>¿Qué es GiftHub?</h2>
                    <p>GiftHub es la solución perfecta para simplificar la experiencia de dar y recibir regalos. GiftHub te permite:</p>
                    <h3>Crear una lista de regalos</h3>
                    <p> Agrega los regalos que realmente te gustaría recibir y comparte tus preferencias con amigos y familiares.</p>
                    <h3>Explorar ideas de regalos</h3>
                    <p> Descubre lo que les gustaría a tus seres queridos y encuentra la inspiración perfecta para regalar.</p>
                    <h3>Reservar regalos</h3>
                    <p>Evita duplicados reservando los regalos que planeas comprar para tus amigos y familiares. Incluso puedes compartir la compra del regalo con otro amigo!</p>
                    <h3>Recordatorios de cumpleaños</h3>
                    <p>Nunca olvides un cumpleaños importante con nuestras alertas y recordatorios integrados.</p>
                    <h3>Amigo secreto</h3>
                    <p>Organiza un amigo secreto con tus amigos y familiares y deja que GiftHub se encargue de TODO.</p>
                </div>
                <div className='col-2'>
                    <img src={birthday} alt='birthday'></img>
                </div>
            </div>
            <div className='instructions-title' id='instructions'>
                <h2>¿Cómo usar GiftHub?</h2>
            </div>
        </div>
    )
}

export default About