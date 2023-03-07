// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

import './Profile.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN Profile %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const Profile = () => {
  // NOTA: El id que llega por useParams es el id de usuario.
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  // useEffect con función asíncrona fetchData, que obtiene todas las entradas y las almacena en useState userData/setUserData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:4000/users/${id}`);
        const body = await res.json();

        if (body.status === 'error') {
          alert(body.message);
        } else {
          setUserData(body.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // NOTA (FIX ME): Siempre que creamos una fecha de creación (created_at) el el backend tiene la hora y minutos correctos PERO al pintar esa hora en el front suma una hora más de lo que debería. La única solución que hemos encontrado ha sido utilizar la zona horaria de portugal al pintar las fechas. Es decir, usamos 'pt-PT' y timeZone: 'Europe/Lisbon'.
  return (
    <main>
      <div className="div-profile-datacontainer">
        {' '}
        {userData && (
          <>
            <h2>Datos de perfil</h2>
            <p className="p-profile-sectiontitle">Avatar del usuario:</p>
            <img
              src={`/avatars/${userData.user.avatar}.png`}
              alt="avatarfoto"
              className="avatar-photo"
            ></img>
            <p className="p-profile-sectiontitle">Nombre de usuario:</p>
            <p>@{userData.user.name}</p>
            <p className="p-profile-sectiontitle">
              Fecha de creación del perfil:
            </p>
            <time dateTime={userData.user.created_at}>
              {new Date(userData.user.created_at).toLocaleDateString('pt-PT', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                timeZone: 'Europe/Lisbon',
              })}
            </time>
            <p className="p-profile-sectiontitle">Galería de fotos:</p>
          </>
        )}
      </div>

      <ul className="ul-profile-photocontainer">
        {userData &&
          userData.user.entries.map((entry) => {
            return (
              <>
                {entry.photos.map((photo) => {
                  return (
                    <li key={entry.photos.id}>
                      <img
                        src={`http://localhost:4000/${photo.photo_name}`}
                        alt="foto"
                      ></img>
                    </li>
                  );
                })}
              </>
            );
          })}
      </ul>
    </main>
  );
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS Profile %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export { Profile };
