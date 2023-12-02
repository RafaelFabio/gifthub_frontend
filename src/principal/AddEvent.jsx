import { useState, useEffect } from "react";
import './SecretFriend.css';
import './AddFriend.css';
import './Wishlist.css';
import './AddEvent.css';

import axios from "axios";
import { getToken } from "../authService.js"

export default function AddEvent({ currentUser, updateEvents }) {

    const [type, setType] = useState(null);
    const [date, setDate] = useState(null);
    const [msg, setMsg] = useState("");

    const eventos = ["Cumpleaños", "Graduación", "Boda", "Baby shower", "Navidad", "Fiesta", "Otro"];

    const handleClick = () => {
        setMsg("");

        if (type && date) {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/events`, {
                user_id: currentUser,
                type: type,
                date: date
            })
                .then((response) => {
                    // console.log(response.data);

                    // Restaurar valores
                    setType(null);
                    setDate(null);

                    // Actualizar en principal
                    updateEvents();
                })
                .catch((error) => {
                    console.error(error);
                    setMsg("Revisa los campos y vuelve a intentarlo");
                })
        } else {
            setMsg("No pueden haber campos vacíos");
        };
    };

    return (
        <form className="event-form">
            <h3>Evento</h3>
            <select
                type="select"
                className="email-input"
                placeholder="Tipo"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required>
                <option value="">
                    Selecciona
                </option>
                {eventos.map((evento) => (
                    <option key={evento} value={evento}>
                        {evento}
                    </option>
                ))}
            </select>
            <input
                type="date"
                className="email-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required />
            <button
                type="button"
                className="submit-btn"
                onClick={handleClick}>Agregar</button>
            {msg && <p>{msg}</p>}
        </form >
    )
}