import React, { useState, useEffect } from 'react';
import './WishCard.css';
import './SecretCard.css';

import axios from "axios";
import { getToken } from "../authService.js"

function SecretCard({ inicio, fin, friendId, budget }) {
    const [friend, setFriend] = useState("");

    const updateFriend = async () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${friendId}`,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            .then((response) => {
                const data = response.data;
                setFriend(data.email);
            }).catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        updateFriend()
    }, [friend]);

    // Cada tarjeta es creada con la información que se tiene guardada del deseo
    if (friend) {
        return (
            <div className='wish-card secret-card'>
                <h2>{friend}</h2>
                <div className='secret-row'>
                    <div className='wish-column secret-column'>
                        <h4>Inicio: <i>{inicio}</i></h4>
                        <h4>Fin: <i>{fin}</i></h4>
                    </div>
                    <h1>$</h1>
                    <h2>{budget}</h2>
                </div>
            </div>
        );
    }
}

export default SecretCard;