import { useState } from "react";
import './SecretFriend.css';
import userIcon from "../assets/icons/user-black.svg";
export default function SecretFriend() {

    const [nombre, setNombre] = useState("");
    const [nombresTabla, setNombresTabla] = useState([]);

    function handleChange(event) {
        setNombre(event.target.value);
    }

    function agregarNombre() {
        if (nombre.trim() !== "") {
          setNombresTabla([...nombresTabla, nombre]);
          setNombre("");
        }
      }

    return (
        <>
            <h1 className="color-texto">Crea tu amigo secreto!</h1>
            <div className="color-cuerpo">
            <h2 className="color-texto">Agrega los nombres de tus amigos a la lista</h2>
            <input
            type="text"
            placeholder="Ingrese un nombre"
            value={nombre}
            onChange={handleChange}
            
            
        />
        
        <button onClick={agregarNombre}>Agregar Nombre</button>
        
        <table className="table">
        <thead>
        <tr>
            <th className="color-texto">Nombres</th>
        </tr>
        </thead>
        <tbody className="color-texto">
          {nombresTabla.map((nombre, index) => (
            <tr key={index}>
              <td>
                {nombre} <img src={userIcon} className="user-icon"/>
                </td> 
            </tr>
          ))}
        </tbody>
        </table>
        </div>
        <h2 className="boton-sortear">Sortear</h2>
        </>
    )
}