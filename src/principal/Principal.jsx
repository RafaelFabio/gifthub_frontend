import React, { useState } from 'react';
import './Principal.css';
import Toggle from "./Toggle";
import NewWish from "./NewWish";
import Wishlist from './Wishlist';

function Principal() {
    const [friendsMode, setFriendsMode] = useState(false);

    // Función para cambiar entre modo personal y amigos
    const toggleMode = () => {
        // Cambia friendsMode a su opuesto booleano
        setFriendsMode(!friendsMode);
    };

    return (
        <div className="principal">
            <Toggle
                friendsMode={friendsMode}
                toggleMode={toggleMode}
            />
            <div className='principal-content'>
                {!friendsMode &&
                    <>
                        <NewWish />
                        <Wishlist />
                    </>
                }
                {friendsMode &&
                    <h1>En progreso...</h1>}
            </div>
        </div>
    );
}

export default Principal;