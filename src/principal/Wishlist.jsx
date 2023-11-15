import React, { useEffect, useState } from 'react';
import './Wishlist.css';
import WishCard from './WishCard';
import axios from "axios";

function Wishlist({ isMine, userId, userWishlist }) {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        if (!isMine) {
            // Si es la lista de un amigo, userWishlist viene vacío
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}/products`)
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    const items = data.map((item) => (
                        <WishCard
                            key={item.id}
                            id={item.id}
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
            {userWishlist ? userWishlist : wishlistItems}
        </div>
    );
}

export default Wishlist;
