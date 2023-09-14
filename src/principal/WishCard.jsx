import React, { useState } from 'react';
import './WishCard.css';

function WishCard({ wish, description, price }) {
    // Cada tarjeta es creada con la información que se tiene guardada del deseo
    return (
        <div className='wish-card'>
            <div className='wish-column'>
                <h2>{wish}</h2>
                <h3>{description}</h3>
            </div>
            <div className='wish-column'>
                <h1>{price}</h1>
            </div>
        </div>
    );
}

export default WishCard;