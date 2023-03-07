// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%

import './Comments.css';
import { useState } from 'react';
import { useToken } from '../../TokenContext';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN Comments %%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const Comments = ({ entry, entries, setEntries }) => {
  const [token] = useToken();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // Función que maneja el envío del formulario para postear comentarios en la DB.
  const handleSubmit = async (
    token,
    inputText,
    setInputText,
    setLoading,
    id
  ) => {
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:4000/entries/${id}/comment`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          comment: inputText,
        }),
      });

      const body = await res.json();

      if (body.status === 'error') {
        alert(body.message);
      } else {
        const copyOfEntries = JSON.parse(JSON.stringify(entries));

        const updatedPost = copyOfEntries.find((entry) => entry.id === id);

        updatedPost.comments = [...updatedPost.comments, body.data.comment];

        setEntries(copyOfEntries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setInputText('');
    }
  };

  // NOTA (FIX ME): Siempre que creamos una fecha de creación (created_at) el el backend tiene la hora y minutos correctos PERO al pintar esa hora en el front suma una hora más de lo que debería. La única solución que hemos encontrado ha sido utilizar la zona horaria de portugal al pintar las fechas. Es decir, usamos 'pt-PT' y timeZone: 'Europe/Lisbon'.
  return (
    <div className="div-comments-container">
      <h4>Comentarios de esta entrada:</h4>
      {entry.comments?.length === 0 ? (
        <p className="p-nocomments">No hay comentarios por el momento...</p>
      ) : (
        <></>
      )}

      <div
        className={
          entry.comments?.length > 0
            ? 'all-comments-container-visible'
            : 'all-comments-container-hidden'
        }
      >
        {entry.comments?.map((comment) => {
          if (entry.id === comment.entry_id) {
            return (
              <div className="div-date-comment-container" key={comment.id}>
                <div>
                  <img
                    src={`/avatars/${comment.userAvatar}.png`}
                    alt="avatarfoto"
                    className="avatar-photo"
                  ></img>
                  <time dateTime={comment.created_at}>
                    <strong>
                      {new Date(comment.created_at).toLocaleDateString(
                        'pt-PT',
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit',
                          timeZone: 'Europe/Lisbon',
                        }
                      )}
                    </strong>
                  </time>
                </div>
                <ul className="ul-comments">
                  <li>
                    <p>{`@${comment.user}: ${comment.comment}`}</p>
                  </li>
                </ul>
              </div>
            );
          }
        })}
      </div>

      <div
        className={
          token
            ? 'comment-form-container-visible'
            : 'comment-form-container-hidden'
        }
      >
        <form
          className="form-comments-container"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(token, inputText, setInputText, setLoading, entry.id);
          }}
        >
          <input
            type="text"
            value={inputText}
            placeholder="Escribe tu comentario..."
            onChange={(e) => setInputText(e.target.value)}
          />
          <button disabled={loading}>✔</button>
        </form>
      </div>
    </div>
  );
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS Comments %%%%%%%%%%%%%%%%%%%%

export { Comments };
