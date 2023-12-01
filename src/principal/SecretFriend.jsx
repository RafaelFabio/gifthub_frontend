import { useState, useEffect } from "react";
import './SecretFriend.css';
import './AddFriend.css';
import './Wishlist.css';

import SecretCard from "./SecretCard.jsx";

import axios from "axios";
import { getToken } from "../authService.js"

export default function SecretFriend({ currentUser }) {

  const [budget, setBudget] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailsTabla, setEmailsTabla] = useState([]);
  const [ids, setIds] = useState([Number(currentUser)]);
  const [activeSantas, setActiveSantas] = useState([]);

  useEffect(() => {
    updateActive();
  }, [currentUser]);

  const agregarEmail = () => {
    setErrorMsg("");

    if (email.trim() !== "") {
      /*
      Para añadir a la lista, se checkea que:
      El usuario exista (con ese email)
      Sea amigo del usuario actual
      */

      axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/email/${email}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        .then((response) => {
          const friendId = response.data.id;

          axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${currentUser}/friends`,
            {
              headers: {
                Authorization: `Bearer ${getToken()}`
              }
            })
            .then((respuesta) => {
              const friends = respuesta.data;
              let success = false;

              friends.forEach((friend) => {
                if (friend.id == friendId) {
                  // Sí es amigo del usuario
                  success = true;
                }
              });

              if (success) {
                setIds([...ids, friendId]);
                setEmailsTabla([...emailsTabla, email]);
                setEmail("");
              } else {
                setErrorMsg("El email no corresponde a uno de tus amigos");
              };

            }).catch((error) => {
              // Puede haber un error si "currentUser" no es el id de un user existente
              console.log(error);
            });

        }).catch((error) => {
          // Puede haber un error si "email" no es el email de un user existente
          setErrorMsg("El email ingresado no es válido");
          console.log(error);
        });
    }
  }

  const updateActive = async () => {
    setActiveSantas([]);

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${currentUser}/ssparticipants`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      .then(async (response) => {
        const active = response.data;

        const promises = active.map(async (item, index) => {
          const group_id = item.group_id;

          const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/secretsantas/${group_id}`);

          const data = respuesta.data;
          const inicio = data.start_date.split('T')[0];
          const fin = data.end_date.split('T')[0];
          const presupuesto = data.budget;

          return <SecretCard
            key={index}
            inicio={inicio}
            fin={fin}
            budget={presupuesto}
            friendId={item.assigned_friend_id}
          />;
        });

        const resolved = await Promise.all(promises);
        setActiveSantas(resolved);
      })
      .catch((error) => { console.log(error) });
  };

  const finalClick = async () => {
    setErrorMsg("");

    if (budget != 0) {

      if (ids.length >= 3) {
        // Se necesitan al menos 3 personas para que haya algún "secreto"
        const pairs = createPairs(ids);
        console.log(pairs);

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/secretsantas`, {
          start_date: start,
          end_date: end,
          budget: budget
        })
          .then((response) => {
            const secretId = response.data.id;

            pairs.forEach((pair) => {
              axios.post(`${import.meta.env.VITE_BACKEND_URL}/ssparticipants`, {
                group_id: secretId,
                user_id: pair[0],
                assigned_friend_id: pair[1]
              })
                .then((respuesta) => {
                  console.log(respuesta.data)

                  // Restaurar valores
                  setBudget(null);
                  setStart(null);
                  setEnd(null);
                  setEmailsTabla([]);
                  setIds([Number(currentUser)]);

                  // Actualizar activos
                  updateActive();
                })
                .catch((error) => {
                  console.error(error);
                  setErrorMsg(error.message);
                });
            });
          })
          .catch((error) => {
            console.error(error);
            setErrorMsg(errorCampo("fechas"));
          })
      } else {
        setErrorMsg(errorCampo("amigos"));
      };
    } else {
      setErrorMsg(errorCampo("presupuesto"));
    };
  };

  const errorCampo = (campo) => {
    return `Revisa el campo de ${campo} y vuelve a intentarlo`;
  };

  const createPairs = (list) => {
    let pairs = [];

    if (list.length > 1) {
      // Es posible crear pares
      let success = false;
      let different = false;
      let index = -1;
      let otherId = -1;
      let used = [];
      let unused = list.slice();

      while (!success) {
        // Resetear valores
        pairs = [];
        used = [];
        unused = list.slice();

        list.forEach((id) => {
          // Resetear valores
          different = false;

          while ((!different) & (!success)) {
            if (used.length === (list.length - 1)) {
              // Solo queda un id por asignar
              otherId = unused[0];
              if (otherId == id) {
                // No se va a poder crear pares sin repetición
                console.log("No fue posible en esta iteración");
              } else {
                success = true;
              };

              // Cortar loop
              different = true;
            } else {
              index = randomInt(0, (unused.length - 1));
              otherId = unused[index];

              if (otherId !== id) {
                different = true;
              };
            }

            if (different) {
              pairs.push([id, otherId]);
              used.push(otherId);
              unused.splice(index, 1);
            };
          };
        });
        // console.log(pairs);
      };
    };

    return pairs;
  };

  function randomInt(min, max) {
    const up = max + 1;
    return Math.floor(Math.random() * (up - min)) + min;
  }

  return (
    <div className="secret-friend">
      <div className="section-secret-friend">
        <h2>¡Crea tu amigo secreto!</h2>
        <div className="secret-box">

          <h3>Presupuesto</h3>

          <input
            type="number"
            className="date-input"
            placeholder="0"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required />

          <h3>Fechas</h3>

          <form className="date-form">
            <div className="date-row">
              <h4>Inicio:</h4>
              <input
                type="date"
                className="date-input"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                required />
            </div>
            <div className="date-row">
              <h4>Fin:</h4>
              <input
                type="date"
                className="date-input"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                required />
            </div>
          </form>

          <h3>Amigos</h3>

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

          <h4>Correos</h4>
          {emailsTabla.map((nombre, index) => (
            <p key={index}>{nombre}</p>
          ))}
        </div>
        {errorMsg && <p><i>{errorMsg}</i></p>}
        <button onClick={finalClick}>Sortear</button>
      </div>
      <div className="section-secret-friend">
        <h2>¡Tus amigos secretos!</h2>
        <div className="wishlist friend-wishlist">
          {activeSantas}
        </div>
      </div>

    </div>
  )
}