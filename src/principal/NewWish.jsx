import React, { useState } from 'react';
import './NewWish.css';
import Wishlist from './Wishlist';

import addIcon from "../assets/icons/add-black.svg";

import axios from 'axios';

function NewWish({ updateWishlist }) {
    const currentUser = 1;
    const [wish, setWish] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const handleSubmit = async () => {
        try {
            // Crear el producto
            const productResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products`, {
                name: wish,
                description: description,
                price: price,
            });

            // Añadirlo a la wishlist
            const wishlistResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/wishlists`, {
                user_id: currentUser,
                product_id: productResponse.data.id,
            });

            await Promise.all([productResponse, wishlistResponse]);

            updateWishlist();

            // Devolver formulario al estado inicial
            setWish('');
            setDescription('');
            setPrice(0);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='new-wish'>
            <form>
                <div className='form-column'>
                    <input className='wish'
                        type="text"
                        placeholder='Deseo'
                        value={wish}
                        onChange={(e) => setWish(e.target.value)}
                        required
                    />
                    <input className='description'
                        type="text"
                        placeholder='Descripción'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <h1>$</h1>
                <div className='form-column'>
                    <input className='price'
                        type="number"
                        placeholder='0,0'
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                </div>
            </form>

            <button className="add-button" type="submit" onClick={handleSubmit}>
                <img src={addIcon} />
            </button>
        </div>
    );
}

export default NewWish;