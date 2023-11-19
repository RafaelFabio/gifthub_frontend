import React, { useEffect, useState } from 'react';
import './Wishlist.css';
import WishCard from './WishCard';
import axios from "axios";

import { getToken } from "../authService.js"

function Wishlist({ isMine, currentUser, userId, userWishlist }) {
    /*
    isMine: bool, indica si la Wishlist es del currentUser
    currentUser: int, indica el id del usuario actual
    userId: int, indica el id del usuario dueño de la Wishlist
    userWishlist: , contiene los elementos de la Wishlist ssi esta es del usuario actual
    */
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        console.log(`[Wishlist] currentUser: ${currentUser}`)
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
                    console.log(data);
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
                })
        }
    }, []);

    return (
        <div className={`wishlist ${isMine ? 'personal-wishlist' : 'friend-wishlist'}`}>
            {/* userWishlist es null si no corresponde a la WishList del currentUser */}
            {userWishlist ? userWishlist : wishlistItems}
        </div>
    );
}

export default Wishlist;
