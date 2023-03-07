// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

import './OwnProfile.css';
import { useToken } from '../../TokenContext';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
// Importamos el json paraseado con los datos de las fotos de avatar.
import AvatarList from '../../Data/Avatar.List.json';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN OwnProfile %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const OwnProfile = () => {
  const [token, setToken, user] = useToken();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState();

  const [avatarId, setAvatarId] = useState();
  const [avatarSelected, setAvatarSelected] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar);
    }
  }, [user]);

  // Si NO estamos logueados redireccionamos a la página principal.
  if (!token) return <Navigate to="/" />;

  // Función fetchDeleteUser para borrar el usuario sus entradas y demás...
  const fetchDeleteUser = async () => {
    setLoading(true);
    if (
      confirm(
        '¿Estás seguro de que deseas borrar tu usuario? (Se borrarán todas tus entradas, fotos, comentarios y likes)'
      )
    ) {
      try {
        const res = await fetch(`http://127.0.0.1:4000/users`, {
          method: 'delete',
          headers: {
            Authorization: token,
          },
        });

        setToken(null);
        alert('Se ha borrado tu usuario correctamente.');
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
    window.location.reload();
  };

  // Función que maneja el cambio del nuevo nombre.
  const handleNewName = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (confirm('¿Estás seguro de que deseas cambiar tu nombre de usuario?')) {
      try {
        const res = await fetch('http://localhost:4000/users/username', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            userId: user.id,
            name: name,
          }),
        });

        const body = await res.json();

        if (body.status === 'error') {
          alert(body.message);
        } else {
          navigate('/ownprofile');
        }
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
    window.location.reload();
  };

  // Función que maneja el cambio del nuevo email.
  const handleNewEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (confirm('¿Estás seguro de que deseas cambiar tu email de usuario?')) {
      try {
        const res = await fetch('http://localhost:4000/users/email', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            userId: user.id,
            email: email,
          }),
        });

        const body = await res.json();

        if (body.status === 'error') {
          alert(body.message);
        } else {
          navigate('/ownprofile');
        }
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
    window.location.reload();
  };

  // Función que maneja el cambio del avatar.
  const handleNewAvatar = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      confirm('¿Estás seguro de que deseas cambiar el avatar de tu usuario?')
    ) {
      try {
        const res = await fetch('http://localhost:4000/users/avatar', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            userId: user.id,
            avatar: Number(avatarId),
          }),
        });

        const body = await res.json();

        if (body.status === 'error') {
          alert(body.message);
        } else {
          navigate('/ownprofile');
        }
        setAvatar(avatarId);
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
    window.location.reload();
  };

  // Función que muestra la fotografía del avatar preseleccionado:
  const showNewAvatar = () => {
    if (avatarSelected === false) {
      return <></>;
    } else {
      return (
        <img
          src={`/avatars/${avatarId}.png`}
          alt="avatarfoto"
          className="avatar-photo-change"
        ></img>
      );
    }
  };

  // NOTA (FIX ME): Siempre que creamos una fecha de creación (created_at) el el backend tiene la hora y minutos correctos PERO al pintar esa hora en el front suma una hora más de lo que debería. La única solución que hemos encontrado ha sido utilizar la zona horaria de portugal al pintar las fechas. Es decir, usamos 'pt-PT' y timeZone: 'Europe/Lisbon'.
  return (
    <main>
      <div className="div-ownprofile-container">
        {' '}
        {user && (
          <>
            <h2>Datos de perfil de tu perfil</h2>
            <p className="p-ownprofile-sectiontitle">Avatar del usuario:</p>
            <img
              src={`/avatars/${avatar}.png`}
              alt="avatarfoto"
              className="avatar-photo"
            ></img>
            <div>
              <select
                required
                defaultValue={'DEFAULT'}
                placeholder="Seleccina un avatar de la lista..."
                onChange={(e) => {
                  setAvatarId(e.target.value);
                  setAvatarSelected(true);
                }}
              >
                <>
                  <option value="DEFAULT" disabled>
                    Elige un nuevo avatar...
                  </option>
                  {AvatarList.map((avatar) => {
                    return (
                      <option value={avatar.id} key={avatar.id}>
                        {avatar.id} {avatar.name}
                      </option>
                    );
                  })}
                </>
              </select>

              <button onClick={handleNewAvatar}>Cambiar avatar</button>
            </div>
            <>{showNewAvatar()}</>

            <p className="p-ownprofile-sectiontitle">Nombre de usuario:</p>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={handleNewName}>Cambiar</button>
            </div>

            <p className="p-ownprofile-sectiontitle">Email:</p>
            <div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleNewEmail}>Cambiar</button>
            </div>

            <p className="p-ownprofile-sectiontitle">
              Fecha de creación del perfil:
            </p>
            <time dateTime={user.created_at}>
              {new Date(user.created_at).toLocaleDateString('pt-PT', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                timeZone: 'Europe/Lisbon',
              })}
            </time>
          </>
        )}
      </div>

      <div className="div-ownprofilebutton-container">
        <NavLink to="/">
          <button
            disabled={loading}
            onClick={() => {
              fetchDeleteUser();
            }}
          >
            Borrar usuario
          </button>
        </NavLink>
      </div>
    </main>
  );
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS OwnProfile %%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export { OwnProfile };
