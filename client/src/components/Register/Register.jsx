// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

import './Register.css';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToken } from '../../TokenContext';

// Importamos el json paraseado con los datos de las fotos de avatar.
import AvatarList from '../../Data/Avatar.List.json';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN Register %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const Register = () => {
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [avatarId, setAvatarId] = useState();
  const [avatarSelected, setAvatarSelected] = useState(false);

  // Si estamos logueados redireccionamos a la página principal.
  if (token) return <Navigate to="/" />;

  // Función que muestra la fotografía del avatar preseleccionado:
  const handleSelectedAvatarPhoto = () => {
    if (avatarSelected === false) {
      return <></>;
    } else {
      return (
        <img
          src={`/avatars/${avatarId}.png`}
          alt="avatarfoto"
          className="avatar-photo"
        ></img>
      );
    }
  };

  // Función que maneja el envío del formulario de registro.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (avatarSelected === false) {
      alert('Debes seleccionar un avatar de la lista');
    } else {
      try {
        const res = await fetch('http://localhost:4000/users', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            avatar: Number(avatarId),
          }),
        });

        const body = await res.json();

        if (body.status === 'error') {
          alert(body.message);
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
      }
    }

    setLoading(false);
  };

  return (
    <main className="main-register">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <p className="p-as-label">Selecciona tu avatar:</p>
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
              Selecciona un avatar de la lista...
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

        <>{handleSelectedAvatarPhoto()}</>

        <label htmlFor="name">Nombre de usuario:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength="1"
          maxLength={12}
          autoFocus
          placeholder="Escribe tu nombre..."
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Escribe tu email..."
          required
        />
        <label htmlFor="pass">Contraseña:</label>
        <input
          type="password"
          id="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6"
          placeholder="Escribe tu contraseña..."
          required
        />

        <button disabled={loading}>Aceptar</button>
      </form>
    </main>
  );
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS Register %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export { Register };
