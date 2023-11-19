import React, { useState } from 'react';
import './AddFriend.css';

import axios from "axios";

function AddFriend({ currentUser, updateFriends }) {
    const [friendEmail, setFriendEmail] = useState("");
    const [feedbackMsg, setFeedbackMsg] = useState("");

    const addFriend = async () => {
        setFeedbackMsg("")
        let friendId = null;

        // Buscar el usuario correspondiente al correo
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/email/${friendEmail}`)
            .then((response) => {
                const data = response.data;
                friendId = data["id"]

                if (userId) {
                    // Crear la amistad entre usuario actual y amigo ingresado
                    axios.post(`${import.meta.env.VITE_BACKEND_URL}/friends`, {
                        user_id_1: currentUser,
                        user_id_2: friendId
                    })
                        .then((response) => {
                            setFeedbackMsg(response.statusText)
                            // Actualizo los amigos del usuario
                            // (Se actualizan también las listas de deseos de amigos)
                            updateFriends()
                        })
                        .catch((error) => {
                            console.error(error);
                            setFeedbackMsg(error.message);
                        })
                }
            })
            .catch((error) => {
                console.error(error);
                setFeedbackMsg(error.message);
            });
    };

    return (
        <div className="add-friend">
            <h2>Añade a tus amigos!</h2>
            <form className="add-form">
                <input
                    type="email"
                    className="email-input"
                    placeholder="Ingresa su email"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    required />
                <button
                    type="button"
                    className="submit-btn"
                    onClick={addFriend}>Añadir</button>
            </form>
            {feedbackMsg !== "" && <p>{feedbackMsg}</p>}
        </div>
    );
}

export default AddFriend;