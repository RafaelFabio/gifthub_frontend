import React, { useState } from 'react';
import './Wishlist.css';
import WishCard from './WishCard';

function Wishlist() {
    // Simulación de los deseos ya creados de un usuario
    const wishlistItems = [
        {
            wish: 'Deseo 1',
            description: 'Descripción del deseo 1',
            price: '$$$',
        },
        {
            wish: 'Deseo 2',
            description: 'Descripción del deseo 2',
            price: '$$$',
        },
        {
            wish: 'Deseo 3',
            description: 'Descripción del deseo 3',
            price: '$$$',
        },
        {
            wish: 'Deseo 4',
            description: 'Descripción del deseo 4',
            price: '$$$',
        }
    ];

    return (
        <div className='wishlist'>
            {wishlistItems.map((item, index) => (
                // Adición de cada deseo a la lista
                <WishCard
                    key={index}
                    wish={item.wish}
                    description={item.description}
                    price={item.price}
                />
            ))}
        </div>
    );
}

export default Wishlist;
