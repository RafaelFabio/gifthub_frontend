import React, { useState, useEffect } from 'react';
import './WishCard.css';
import giftIcon from "../assets/icons/gift-white.svg";
import brokenIcon from "../assets/icons/broken-white.svg";
import trashIcon from "../assets/icons/trash-white.svg";

import axios from "axios";

function WishCard({ productId, currentUser, wish, description, price, isMine, updateWishlist }) {
    const [icon, setIcon] = useState(giftIcon);
    const [byMe, setByMe] = useState(false);
    const [byOther, setByOther] = useState(false);
    const [ownedBy, setOwnedBy] = useState(null);
    const [load, setLoad] = useState(false);

    const toggleReservation = async (first) => {
        if (!byMe) {
            // No hay actualmente una reserva del producto
            // (No está reservado por mí, y se se llegó al botón, no puede estar reservado por otro)

            if (currentUser) {
                if (!first) {
                    // Crear la reserva
                    axios.post(`${import.meta.env.VITE_BACKEND_URL}/reservations`, {
                        product_id: productId,
                        user_id: ownedBy,
                        // El que reserva (currentUser) es el friend_id
                        friend_id: currentUser
                    }).then((response) => {
                        console.log(response)
                        setByMe(true);
                        setIcon(brokenIcon);
                    }).catch((error) => {
                        console.log(error)
                    });
                } else {
                    // Solo actualizo el estado y botón
                    setByMe(true);
                    setIcon(brokenIcon);
                }
            }
        } else {
            try {
                // Recupero la reserva
                const reservation = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}/reservations`);
                const data = reservation.data;
                // (Solo puede haber una reserva, que es la reconocida actualmente)

                const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/reservations/${data.id}`);

                setByMe(false);
                setIcon(giftIcon);

                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const deleteWish = async () => {
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}`)
            .then(() => {
                updateWishlist();
            });
    }

    const handleClick = () => {
        if (isMine) {
            deleteWish();
        } else {
            toggleReservation(false);
            // false indica que el estado inicial del botón ya fue seteado antes
        };
    };

    useEffect(() => {
        if (!isMine) {
            // Se recupera la wishlist a la que pertenece el producto
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}/wishlists`)
                .then((response) => {
                    const data = response.data;
                    setOwnedBy(data.user_id);
                }).catch((error) => {
                    console.log(error);
                });

            // Se revisa si ha sido reservado
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}/reservations`)
                .then((response) => {
                    const data = response.data;

                    if (data) {
                        // El producto sí cuenta con alguna reserva
                        if (data.friend_id == currentUser) {
                            // Actualizo que sí está reservado por mí
                            toggleReservation(true);
                            // (true indica que es primera vez que se setea)
                        } else {
                            // Está reservado por otra persona
                            setByOther(true);
                        }
                    } else {
                        console.log(`[${productId}] No one has reserved this product yet`)
                    }

                    // Se carga el componente una vez que ya se sepa qué hacer con el botón
                    setLoad(true);
                }).catch((error) => {
                    console.log(error);
                });
        }

    }, []);

    // Cada tarjeta es creada con la información que se tiene guardada del deseo
    if (load) {
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
        )
    };
}

export default WishCard;