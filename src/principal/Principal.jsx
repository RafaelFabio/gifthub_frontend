import React, { useState, useEffect } from 'react';
import './Principal.css';
import Toggle from "./Toggle";
import NewWish from "./NewWish";
import Wishlist from './Wishlist';
import WishCard from './WishCard';
import Navigation from '../navigation/Navigation';
import AddFriend from './AddFriend.jsx';

import { Link } from 'react-router-dom';
import shuffleIcon from "../assets/icons/shuffle-black.svg"

import axios from "axios";

import { isAuthenticated, getToken, decodeToken } from "../authService.js"

function Principal() {
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [userWishlist, setUserWishlist] = useState(null);
    const [friendsMode, setFriendsMode] = useState(false);
    const [friends, setFriends] = useState({});

    const setUser = async () => {
        if (isAuthenticated()) {
            const token = getToken();
            const decoded = await decodeToken(token);
            setCurrentUser(decoded["sub"])
        };
    };

    // Función para cambiar entre modo personal y amigos
    const toggleMode = () => {
        // Cambia friendsMode a su opuesto booleano
        setFriendsMode(!friendsMode);
    };

    const updateWishlist = async () => {
        // Se consulta por los deseos del usuario
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${currentUser}/products`,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            .then((response) => {
                const data = response.data;
                const items = data.map((item) => (
                    <WishCard
                        key={item.id}
                        productId={item.id}
                        currentUser={currentUser}
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

    const updateFriends = () => {
        // Se consulta por los amigos del usuario actual
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${currentUser}/friends`,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
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
    }

    useEffect(() => {
        const completeData = async () => {
            await setUser();

            if (currentUser) {
                console.log(`[Principal] currentUser: ${currentUser}`)
                // Wishlist inicial del usuario actual
                updateWishlist();
                updateFriends();
            }
        };

        completeData();
    }, [currentUser]);

    if (currentUser) {
        // Solo se retorna luego de que se seteo currentUser
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
                                <NewWish
                                    updateWishlist={updateWishlist}
                                    currentUser={currentUser} />
                                <Wishlist
                                    isMine={true}
                                    currentUser={currentUser}
                                    userId={currentUser}
                                    userWishlist={userWishlist} />
                            </div>
                        }
                        {friendsMode &&
                            <>
                                <Link to="/secret-friend">
                                    <img src={shuffleIcon} className='icon' />
                                </Link>
                                <AddFriend currentUser={currentUser} updateFriends={updateFriends} />
                                <div className='principal-content principal-friends'>
                                    {Object.keys(friends).length === 0 ?
                                        /* Si no tiene amigos aún */
                                        <h1>¡Añade amigos para ver sus deseos aquí!</h1>
                                        :
                                        /* Por cada amigo, se muestra su lista de deseos */
                                        Object.values(friends).map((friend) => (
                                            <div className='principal-friend' key={friend.id}>
                                                <h2>@{friend.username}</h2>
                                                <Wishlist
                                                    key={friend.id}
                                                    isMine={false}
                                                    currentUser={currentUser}
                                                    userId={friend.id}
                                                />
                                            </div>))
                                    }
                                </div>
                            </>}
                    </>
                </div>
            </>
        );
    }
}

export default Principal;