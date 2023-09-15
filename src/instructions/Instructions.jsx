import { useState, useRef } from 'react';
import './Instructions.css';
import Step from './Step';
import Navigation from '../navigation/Navigation';

// Iconos (en negro)
import giftIcon from "../assets/icons/gift-black.svg";
import userIcon from "../assets/icons/user-black.svg";
import friendsIcon from "../assets/icons/friends-black.svg";
import heartIcon from "../assets/icons/heart-black.svg";
import homeIcon from "../assets/icons/home-black.svg";
import infoIcon from "../assets/icons/info-black.svg";
import shuffleIcon from "../assets/icons/shuffle-black.svg";

function Instructions({ inLanding }) {
    const [currentStep, setCurrentStep] = useState(0); // Comienza en el paso 0, "bienvenida"

    const progressBarRef = useRef(null);

    // Función para cambiar el currentStep
    const goToStep = (step) => {
        setCurrentStep(step);
    };

    const steps = [
        {
            title: '¡Bienvenid@! 🎉',
            subtitle: 'Paso 0: Te damos la bienvenida',
            instructions: '¡Estamos felices de que hayas encontrado nuestra aplicación! A continuación te enseñaremos paso a paso cómo hacer uso de ella.',
            icons: [],
            indication: "Haz click en siguiente para comenzar esta guía. También puedes apretar la barra de progreso para saltar entre los pasos."
        },
        {
            title: 'Cuenta 🎁',
            subtitle: 'Paso 1: Crea tu propia cuenta',
            instructions: 'Para poder empezar a hacer uso de la aplicación, asegúrate de registrarse, y posteriormente iniciar sesión. ¡Así podrás empezar a crear tus propias listas de deseos y más!',
            icons: [userIcon],
            indication: "Encuentra el ícono de perfil en la barra de navegación a la derecha."
        },
        {
            title: 'Navegación 🧭',
            subtitle: 'Paso 2: Conoce la barra de navegación',
            instructions: 'A través de la barra de navegación, tienes la posibilidad de acceder a la página de inicio, a la página de deseos, a esta página de instrucciones, y a tu perfil.',
            icons: [homeIcon, heartIcon, infoIcon, userIcon],
            indication: "Puedes acceder a todas las páginas a través de sus íconos en la barra de navegación."
        },
        {
            title: 'Lista de deseos ❤️',
            subtitle: 'Paso 3: Conoce y disfruta tu lista de deseos',
            instructions: 'En la página de deseos, se encuentra tu propia lista de deseos, en la cuál puedes añadir tus regalos más deseados. Guarda los regalos en tu lista para que tus amigos sepan qué es lo que deseas, y te lo regalen ;)',
            icons: [heartIcon],
            indication: "Encuentra tu lista de deseos siguiendo este ícono hacia la página de deseos."
        },
        {
            title: 'Amigos 🎂',
            subtitle: 'Paso 4: Añade a tus usuarios amigos',
            instructions: '¡Añade a todos tus amigos! Para que así entre ustedes conozcan los deseos del otro. Con su nombre de usuario, puedes añadirlos desde la página de deseos.',
            icons: [heartIcon, friendsIcon],
            indication: "Encuentra las listas de deseos de tus amigos desde la página de deseos, seleccionando la vista de amigos."
        },
        {
            title: 'Regala 🎀',
            subtitle: 'Paso 5: Reserva lo que quieres regalar',
            instructions: 'Explora las listas de deseos de tus amigos, y cuando encuentres el regalo ideal para darle, ¡Resérvalo! Así nadie más que tú llegará con ese regalo único y especial.',
            icons: [giftIcon],
            indication: "Encontrarás este ícono debajo de los deseos de tus amigos, haz click en él para reservar."
        },
        {
            title: 'Amigo secreto 🔒',
            subtitle: 'Paso 6: Organiza un amigo secreto',
            instructions: 'Organiza un amigo secreto con tus amigos, de manera que a cada uno se le asigne un regalo de la lista de deseos de otro. Todos podrán sorprenderse con cuál es el regalo de su wishlist que le llegará, ¡Y quién se lo dará!',
            icons: [shuffleIcon],
            indication: "Encuentra este ícono en, haz click en él para comenzar a organizar el amigo secreto."
        }
    ];

    const totalSteps = steps.length - 1; // No se considera el paso 0

    // Función que calcula el progreso (porcentaje) con respecto a los pasos totales
    const calculateCompletionPercentage = () => {
        return (currentStep / totalSteps) * 100;
    };

    const handleProgressBarClick = (e) => {
        // Recupero el elemento de la referencia
        const progressBar = progressBarRef.current;
        // Click en el eje X relativo a la progress-bar
        const clickX = e.clientX - progressBar.getBoundingClientRect().left;
        // (Click considerando ventana completa, menos la posición de inicio de la progress-bar)
        const progressBarWidth = progressBar.clientWidth;

        // Cálculo del paso deseado
        const wantedStep = Math.ceil((clickX / progressBarWidth) * totalSteps);
        // (Se elige el techo (ceil), para simular el click a ese paso)

        // Modifica el currentStep
        goToStep(wantedStep);

        // IMPORTANTE: Se está haciendo el cálculo con respecto a progress-bar, no progress
        // (De lo contrario no se estaría haciendo un retorno correcto)
    };

    return (
        <>
            {!inLanding && <>
                <Navigation />
            </>}
            <div className="instructions-container" style={{ margin: inLanding ? "0 auto" : "150px 10% 20px 10%" }}>
                <div
                    className="progress-bar"
                    ref={progressBarRef} // Este elemento es el referenciado por progressBarRef
                    onClick={handleProgressBarClick} // Se gatilla la función
                >
                    <div
                        className="progress"
                        // El ancho se ajustará según el progreso
                        style={{ width: `${calculateCompletionPercentage()}%` }}
                    ></div>
                </div>

                <div className="instructions-content">
                    {steps.map((step, index) => (
                        <Step
                            key={index}
                            id={index}
                            title={step.title}
                            subtitle={step.subtitle}
                            instructions={step.instructions}
                            icons={step.icons}
                            indication={step.indication}
                            current={currentStep}
                        />
                    ))}
                </div>

                <div className="controls">
                    {/* El botón para retroceder se muestra desde el 1er paso */}
                    {currentStep > 0 && (
                        <button onClick={() => goToStep(currentStep - 1)}>Anterior</button>
                    )}

                    {/* El botón para avanzar se muestra hasta antes del último paso */}
                    {currentStep < totalSteps && (
                        <button onClick={() => goToStep(currentStep + 1)}>Siguiente</button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Instructions;
