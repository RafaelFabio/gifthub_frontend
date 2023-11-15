import React, { useState, useEffect } from 'react';
import './WishCard.css';
import giftIcon from "../assets/icons/gift-white.svg";
import brokenIcon from "../assets/icons/broken-white.svg";
import trashIcon from "../assets/icons/trash-white.svg";

import axios from "axios";

function WishCard({ id, wish, description, price, isMine, updateWishlist }) {
    const currentUser = 1;
    const [icon, setIcon] = useState(giftIcon);
    const [byMe, setByMe] = useState(false);
    const [byOther, setByOther] = useState(false);
    const [ownedBy, setOwnedBy] = useState(null);

    const toggleReservation = async (first) => {
        console.log(id);
        if (!byMe) {
            // No hay actualmente una reserva del producto

            setByMe(true);
            setIcon(brokenIcon);

            if (!first) {
                // Crear la reserva
                const reservationResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reservations`, {
                    product_id: id,
                    user_id: ownedBy,
                    friend_id: currentUser
                });

                console.log(reservationResponse)
            }
        } else {
            setByMe(false);
            setIcon(giftIcon);

            // Recupero la reserva
            const reservation = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}/reservations`);
            const data = reservation.data;
            // (Solo puede haber una reserva, que es la reconocida actualmente)

            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/reservations/${data.id}`);

            console.log(response)
        }
    }

    const deleteWish = async () => {
        const productResponse = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);

        updateWishlist();
    }

    const handleClick = () => {
        if (isMine) {
            deleteWish();
        } else {
            toggleReservation(false);
        };
    }

    useEffect(() => {
        if (!isMine) {
            // Se recupera la wishlist a la que pertenece el producto
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}/wishlists`)
                .then((response) => {
                    const data = response.data;
                    setOwnedBy(data.user_id);
                }).catch((error) => {
                    console.log(error);
                });

            // Se revisa si ha sido reservado
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}/reservations`)
                .then((response) => {
                    const data = response.data;

                    if (data) {
                        if (data.friend_id == currentUser) {
                            // Actualizo que sí está reservado por mí
                            toggleReservation(true);
                        } else {
                            setByOther(true);
                        }
                    } else {
                        console.log(`[${id}] No one has reserved this product yet`)
                    }
                }).catch((error) => {
                    console.log(error);
                });
        }

    }, []);

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
            {/* 
            byOther siempre va a ser falso si el producto es del usuario.
            No se permite reservar si ya fue reservado por otro usuario.
            */}
            {!byOther &&
                <button className='gift-button' onClick={handleClick}>
                    <img src={isMine ? trashIcon : icon} />
                </button>
            }
        </div >
    );
}

export default WishCard;