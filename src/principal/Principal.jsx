import React, { useState, useEffect } from 'react';
import './Principal.css';
import Toggle from "./Toggle";
import NewWish from "./NewWish";
import Wishlist from './Wishlist';
import WishCard from './WishCard';
import Navigation from '../navigation/Navigation';

import { Link } from 'react-router-dom';
import shuffleIcon from "../assets/icons/shuffle-black.svg"

import axios from "axios";

function Principal() {
    const currentUser = 1;
    const [userWishlist, setUserWishlist] = useState(null);
    const [friendsMode, setFriendsMode] = useState(false);
    const [friends, setFriends] = useState({});

    // Función para cambiar entre modo personal y amigos
    const toggleMode = () => {
        // Cambia friendsMode a su opuesto booleano
        setFriendsMode(!friendsMode);
    };

    const updateWishlist = () => {
        // Se consulta por los deseos del usuario
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${currentUser}/products`)
            .then((response) => {
                const data = response.data;
                const items = data.map((item) => (
                    <WishCard
                        key={item.id}
                        id={item.id}
                        wish={item.name}
                        description={item.description}
                        price={item.price}
                        isMine={true}
                        updateWishlist={updateWishlist}
                    />
                ));

                // Se cambia el valor de userWishlist
                // IMPORTANTE: Este valor es pasado a la Wishlist del usuario más abajo, por lo que se actualizará
                setUserWishlist(items);
            });
    };

    useEffect(() => {
        // Wishlist inicial del usuario actual
        updateWishlist();

        // Se consulta por los amigos del usuario actual
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${currentUser}/friends`)
            .then((response) => {
                const data = response.data;
                const items = {};
                data.map((item) => {
                    items[item.id] = item
                });
                setFriends(items);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

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
                            <NewWish updateWishlist={updateWishlist} />
                            <Wishlist
                                isMine={true}
                                userId={currentUser}
                                userWishlist={userWishlist} />
                        </div>
                    }
                    {friendsMode &&
                        <>
                            <Link to="/secret-friend">
                                <img src={shuffleIcon} className='icon' />
                            </Link>
                            <div className='principal-content principal-friends'>
                                {/* Por cada amigo, se muestra su lista de deseos */}
                                {Object.values(friends).map((friend) => (
                                    <div className='principal-friend' key={friend.id}>
                                        <h2>@{friend.username}</h2>
                                        <Wishlist
                                            key={friend.id}
                                            isMine={false}
                                            userId={friend.id} />
                                    </div>
                                ))}
                            </div>
                        </>}
                </>
            </div>
        </>
    );
}

export default Principal;