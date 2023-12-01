import React, { useState, useEffect } from 'react';
import './Principal.css';
import Toggle from "./Toggle";
import NewWish from "./NewWish";
import Wishlist from './Wishlist';
import WishCard from './WishCard';
import Navigation from '../navigation/Navigation';
import AddFriend from './AddFriend.jsx';
import SecretFriend from './SecretFriend.jsx';
import AddEvent from './AddEvent.jsx'
import EventCard from './EventCard.jsx';

import shuffleIcon from "../assets/icons/shuffle-black.svg"
import calendarIcon from "../assets/icons/calendar-black.svg"

import axios from "axios";

import { isAuthenticated, getToken, decodeToken } from "../authService.js"

function Principal() {
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [userWishlist, setUserWishlist] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const [friendsMode, setFriendsMode] = useState(false);
    const [friends, setFriends] = useState({});
    const [secretSanta, setSecretSanta] = useState(false);
    const [calendar, setCalendar] = useState(false);

    const setUser = async () => {
        if (isAuthenticated()) {
            const token = getToken();
            const decoded = await decodeToken(token);
            setCurrentUser(decoded["sub"])
        };
    };

    // Función para cambiar entre modo personal y amigos
    const toggleMode = () => {
        let toColor = "#000000";
        if (friendsMode) {
            // Rosado
            toColor = "#F2D6E2"
        } else {
            // Amarillo
            toColor = "#F0D7AC"
        };
        document.documentElement.style.setProperty('background-color', toColor);

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

    const updateEvents = async () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${currentUser}/events`,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            .then((response) => {
                const data = response.data;
                const items = [];

                data.map((item, index) => {
                    items.push(<EventCard
                        key={index}
                        type={item.type}
                        date={item.date} />);
                });

                setUserEvents(items);
            }).catch((error) => {
                console.log(error);
            });
    };

    const updateFriends = async () => {
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

    const updateUsername = async () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${currentUser}`,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            .then((response) => {
                const data = response.data;
                setUserName(data.username);
            }).catch((error) => {
                console.log(error);
            });
    }

    const shuffleSecretSanta = () => {
        setSecretSanta(!secretSanta);
    };

    const toggleCalendar = () => {
        setCalendar(!calendar);
    };

    useEffect(() => {
        const completeData = async () => {
            await setUser();

            if (currentUser) {
                console.log(`[Principal] currentUser: ${currentUser}`)
                // Wishlist inicial del usuario actual
                await updateUsername();
                await updateWishlist();
                await updateFriends();
                await updateEvents();
            };
        };

        completeData();

        return () => {
            // Cuando se desmonta
            const pinkColor = "#F2D6E2";
            document.documentElement.style.setProperty('background-color', pinkColor);
        };
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
                            <>
                                <h2>¿<i>Cuáles son tus deseos hoy</i> <b>{userName}</b>?</h2>
                                <div className='principal-content principal-personal'>
                                    <NewWish
                                        updateWishlist={updateWishlist}
                                        currentUser={currentUser} />
                                    {userWishlist.length === 0 ?
                                        <div className='empty-list wishlist personal-wishlist'>
                                            <h2>¡Añade tus deseos para verlos aquí!</h2>
                                        </div>
                                        : <Wishlist
                                            isMine={true}
                                            currentUser={currentUser}
                                            userId={currentUser}
                                            userWishlist={userWishlist} />
                                    }
                                </div>
                                <h2>¡Para que sepan cuándo regalarte!</h2>
                                <div className='principal-content principal-personal'>
                                    <div className='wishlist personal-wishlist'>{userEvents}</div>
                                    <AddEvent
                                        currentUser={currentUser}
                                        updateEvents={updateEvents} />
                                </div>
                            </>

                        }
                        {friendsMode &&
                            <>
                                <button className='shuffle-button' onClick={shuffleSecretSanta}>
                                    <img src={shuffleIcon} />
                                </button>
                                {secretSanta ?
                                    <div className='principal-content'>
                                        <SecretFriend currentUser={currentUser} />
                                    </div>
                                    :
                                    <>
                                        <AddFriend currentUser={currentUser} updateFriends={updateFriends} />
                                        <div className='principal-content principal-friends'>
                                            {Object.keys(friends).length === 0 ?
                                                /* Si no tiene amigos aún */
                                                <div className='empty-list'>
                                                    <h1>¡Añade amigos para ver sus deseos aquí!</h1>
                                                </div>
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
                                                            calendar={calendar}
                                                        />
                                                    </div>))
                                            }
                                        </div>
                                        <button className='shuffle-button' onClick={toggleCalendar}>
                                            <img src={calendarIcon} />
                                        </button>
                                    </>}
                            </>}
                    </>
                </div>
            </>
        );
    }
}

export default Principal;