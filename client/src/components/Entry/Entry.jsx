// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

import './Entry.css';
import { useState } from 'react';
import { useToken } from '../../TokenContext';
import { Comments } from '../Comments/Comments';
import { Slider } from '../Slider/Slider';
import { NavLink } from 'react-router-dom';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN Entry %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// Partimos de una entrada (entrie) que vine del componente EntrySearch.
const Entry = ({ entry, entries, setEntries }) => {
  const [token] = useToken();
  const [loading, setLoading] = useState();

  // Función que maneja el evento de like.
  const handleLikeEntrie = async (e, idEntry, likedByMe, entrie) => {
    setLoading(true);

    e.target.classList.toggle('like');
    try {
      // Variable que almacenará el método a utilizar con el fetch.
      let method = likedByMe ? 'delete' : 'post';

      const res = await fetch(
        `http://localhost:4000/entries/${idEntry}/likes`,
        {
          method,
          headers: {
            Authorization: token,
          },
        }
      );

      const body = await res.json();

      if (body.status === 'error') {
        alert(body.message);
      } else {
        setEntries(
          entries.map((entry) => {
            if (entry.id === idEntry) {
              // Comprobamos si la entrada tiene la clase "like".
              const hasLikeClass = e.target.classList.contains('like');

              // Si la tiene incrementamos los likes de esta entrada en +1, de lo contrario decrementamos en -1.
              if (hasLikeClass) {
                entry.likes++;
              } else {
                entry.likes--;
              }

              // Invertimos el valor de likedByMe.
              entry.likedByMe = !entry.likedByMe;
            }
            // Retornamos la entrada.
            return entry;
          })
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Función que maneja el evento de click del botón para borrar una entrada.
  const handleDeleteEntrie = async (id) => {
    setLoading(true);

    if (confirm('¿Deseas eliminar esta entrada?')) {
      try {
        const res = await fetch(`http://localhost:4000/entries/${id}`, {
          method: 'delete',
          headers: {
            Authorization: token,
          },
        });

        const body = await res.json();

        if (body.status === 'error') {
          alert(body.message);
        } else {
          setEntries(entries.filter((entry) => entry.id !== id));
        }
      } catch (err) {
        console.error(err);
      }
    }

    setLoading(false);
  };

  // NOTA (FIX ME): Siempre que creamos una fecha de creación (created_at) el el backend tiene la hora y minutos correctos PERO al pintar esa hora en el front suma una hora más de lo que debería. La única solución que hemos encontrado ha sido utilizar la zona horaria de portugal al pintar las fechas. Es decir, usamos 'pt-PT' y timeZone: 'Europe/Lisbon'.
  return (
    <li className="li-entry">
      <header>
        <NavLink to={`/profile/${entry.user_id}`}>
          <img
            src={`/avatars/${entry.avatar}.png`}
            alt="avatarfoto"
            className="avatar-photo"
          ></img>
          <p>@{entry.name || 'Username'}</p>
        </NavLink>

        <time dateTime={entry.created_at}>
          {new Date(entry.created_at).toLocaleDateString('pt-PT', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            timeZone: 'Europe/Lisbon',
          })}
        </time>
      </header>

      <div className="div-place-slider-description">
        <p>📍 {entry.place}</p>
        <Slider entry={entry} key={entry.id} />
        <p>{entry.description}</p>
      </div>

      <Comments entry={entry} entries={entries} setEntries={setEntries} />

      <footer>
        <div className="div-likescontainer">
          <div
            className={`heart ${token && entry.likedByMe && 'like'}`}
            onClick={(e) => {
              if (token) handleLikeEntrie(e, entry.id, entry.likedByMe, entry);
            }}
            disabled={loading}
          ></div>
          <p>{entry.likes}</p>
        </div>

        {token && entry.owner === 1 && (
          <button
            className="button"
            onClick={() => {
              if (token) handleDeleteEntrie(entry.id);
            }}
            disabled={loading}
          >
            Eliminar
          </button>
        )}
      </footer>
    </li>
  );
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS Entry %%%%%%%%%%%%%%%%%%%%%%%%%

export { Entry };
