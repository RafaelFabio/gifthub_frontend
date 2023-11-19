import { useState } from "react";
import './SecretFriend.css';
import './AddFriend.css';
import Navigation from "../navigation/Navigation";

export default function SecretFriend() {

  const [email, setEmail] = useState("");
  const [emailsTabla, setEmailsTabla] = useState([]);

  function agregarEmail() {
    // Checkear que el mail corresponda a uno de sus amigos
    if (email.trim() !== "") {
      setEmailsTabla([...emailsTabla, email]);
      setEmail("");
    }
  }

  return (
    <>
      <>
        <Navigation />
      </>
      <div className="secret-content">
        <>
          <h1>Crea tu amigo secreto!</h1>
          <div className="secret-box">
            <h2>Añade a tus amigos a la lista!</h2>
            <form className="add-form">
              <input
                type="email"
                className="email-input"
                placeholder="Ingresa su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
              <button
                type="button"
                className="submit-btn"
                onClick={agregarEmail}>Agregar</button>
            </form>

            <h3>Correos</h3>
            {emailsTabla.map((nombre, index) => (
              <p key={index}>{nombre}</p>
            ))}
          </div>
          <button>Sortear</button>
        </>
      </div>
    </>
  )
}