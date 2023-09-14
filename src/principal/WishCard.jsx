import React, { useState } from 'react';
import './WishCard.css';

function WishCard({ wish, description, price }) {
    // Cada tarjeta es creada con la información que se tiene guardada del deseo
    return (
        <div className='wish-card'>
            <div className='wish-column'>
                <h2>{wish}</h2>
                <h4><i>{description}</i></h4>
            </div>
            <h1>$</h1>
            <div className='wish-column'>
                <h2>{price}</h2>
            </div>
        </div>
    );
}

export default WishCard;