import React, { useState, useEffect } from 'react';
import './Principal.css';
import Toggle from "./Toggle";
import NewWish from "./NewWish";
import Wishlist from './Wishlist';
import Navigation from '../navigation/Navigation';

function Principal() {
    const [friendsMode, setFriendsMode] = useState(false);

    // Función para cambiar entre modo personal y amigos
    const toggleMode = () => {
        // Cambia friendsMode a su opuesto booleano
        setFriendsMode(!friendsMode);
    };

    return (
        <>
            <>
                <Navigation />
            </>
            <div className="principal">
                <Toggle
                    friendsMode={friendsMode}
                    toggleMode={toggleMode}
                />
                <>
                    {!friendsMode &&
                        <div className='principal-content principal-personal'>
                            <NewWish />
                            <Wishlist
                                isMine={true} />
                        </div>
                    }
                    {friendsMode &&
                        <div className='principal-content principal-friends'>
                            <Wishlist
                                isMine={false} />
                            <Wishlist
                                isMine={false} />
                            <Wishlist
                                isMine={false} />
                        </div>}
                </>
            </div>
        </>
    );
}

export default Principal;