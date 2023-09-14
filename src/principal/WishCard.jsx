import React, { useState } from 'react';
import './WishCard.css';
import giftIcon from "../assets/icons/gift-white.svg";

function WishCard({ wish, description, price, isMine }) {
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
            {!isMine &&
                <button className='gift-button'>
                    <img src={giftIcon} />
                </button>
            }
        </div>
    );
}

export default WishCard;