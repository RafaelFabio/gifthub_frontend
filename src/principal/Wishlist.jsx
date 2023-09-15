import React, { useState } from 'react';
import './Wishlist.css';
import WishCard from './WishCard';

function Wishlist({ isMine }) {
    // Simulación de los deseos ya creados de un usuario
    const wishlistItems = [
        {
            wish: 'Deseo 1',
            description: 'Descripción del deseo 1',
            price: '100',
        },
        {
            wish: 'Deseo 2',
            description: 'Descripción del deseo 2',
            price: '200',
        },
        {
            wish: 'Deseo 3',
            description: 'Descripción del deseo 3',
            price: '300',
        },
        {
            wish: 'Deseo 4',
            description: 'Descripción del deseo 4',
            price: '400',
        }
    ];

    return (
        <div className={`wishlist ${isMine ? 'personal-wishlist' : 'friend-wishlist'}`}>
            {wishlistItems.map((item, index) => (
                // Adición de cada deseo a la lista
                <WishCard
                    key={index}
                    wish={item.wish}
                    description={item.description}
                    price={item.price}
                    isMine={isMine}
                />
            ))}
        </div>
    );
}

export default Wishlist;
