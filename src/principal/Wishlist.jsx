import React, { useEffect, useState } from 'react';
import './Wishlist.css';
import WishCard from './WishCard';
import EventCard from './EventCard.jsx';
import axios from "axios";

import { getToken } from "../authService.js"

function Wishlist({ isMine, currentUser, userId, calendar, userWishlist }) {
    /*
    isMine: bool, indica si la Wishlist es del currentUser
    currentUser: int, indica el id del usuario actual
    userId: int, indica el id del usuario dueño de la Wishlist
    userWishlist: [], contiene los elementos de la Wishlist ssi esta es del usuario actual
    */
    const [wishlistItems, setWishlistItems] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // console.log(`[Wishlist] currentUser: ${currentUser}`)
        if (!isMine) {
            // Si es la lista de un amigo (no del currentUser), userWishlist viene vacío
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}/products`,
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
                            isMine={isMine}
                        />
                    ));

                    setWishlistItems(items);
                }).catch((error) => {
                    console.log(error);
                });

            // También quiero los eventos del usuario (que no es currentUser)
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}/events`,
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

                    setEvents(items);
                }).catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    return (
        <div className={`wishlist ${isMine ? 'personal-wishlist' : 'friend-wishlist'}`}>
            {/* userWishlist es null si no corresponde a la WishList del currentUser 
            (sino no va a haber sido enviado) */}
            {isMine ? userWishlist : (calendar ? events : wishlistItems)}
        </div>
    );
}

export default Wishlist;
