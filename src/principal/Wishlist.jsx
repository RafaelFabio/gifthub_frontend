import React, { useEffect, useState } from 'react';
import './Wishlist.css';
import WishCard from './WishCard';
import axios from "axios";

function Wishlist({ isMine }) {
    const [wishlistItems, setWishlistItems] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`)
            .then((response) => {
                const data = response.data;
                const items = {};
                data.map((item) => {
                    items[item.id] = item
                });
                setWishlistItems(items);
            }).catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div className={`wishlist ${isMine ? 'personal-wishlist' : 'friend-wishlist'}`}>
            {Object.values(wishlistItems).map((wishlistItem) => (
                // Adición de cada deseo a la lista
                <WishCard
                    key={wishlistItem.id}
                    wish={wishlistItem.name}
                    description={wishlistItem.description}
                    price={wishlistItem.price}
                    isMine={isMine}
                />
            ))}
        </div>
    );
}

export default Wishlist;
