// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

import './Header.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useToken } from '../../TokenContext';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN Header %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const Header = () => {
  const [token, setToken] = useToken();
  const [user, setUser] = useState(null);

  // NOTA: Tras los cambios realizados en el TokenContex.jsx, ya que ahora se envía por contexto los datos del usuario logueado, podríamos prescindir de el useEffect que hay a continuación. Este useEffect se activa al detectar cambios en el token para lanzar la función userData, que obtiene los datos del usuario logueado y los almacena en el useState [user, setUser]; todo esto sería innecesario si simplemente hiciésemos:   const [token, setToken, user] = useToken();

  // Utilizamos useEffect para acceder a los datos del usuario si existe token.
  useEffect(() => {
    const userData = async () => {
      try {
        const res = await fetch('http://localhost:4000/users', {
          headers: {
            Authorization: token,
          },
        });

        const body = await res.json();

        if (body.status === 'error') {
          alert(body.message);
        } else {
          setUser(body.data.user);
        }
      } catch (err) {
        console.error(err);
      }
    };

    // Si el usuario está logeado buscamos sus datos.
    if (token) userData();
  }, [token]);

  return (
    <header>
      <NavLink to="/">
        <div className="div-logo-h1-container">
          <img id="logo" src="/logo-lejogram.png" alt="logo lejogram" />
          <p>LeJoGram</p>
        </div>
      </NavLink>

      <nav className="nav-buttons">
        <div className="div-navlink-container">
          {token && (
            <NavLink to="/ownprofile">
              <button className="button">
                {token && user && <p className="p-username">@{user.name}</p>}
              </button>
            </NavLink>
          )}

          {(token || !token) && (
            <NavLink to="/">
              <button className="button">Inicio</button>
            </NavLink>
          )}
        </div>

        <div className="div-navlink-container">
          {!token && (
            <NavLink to="/login">
              <button className="button">Login</button>
            </NavLink>
          )}

          {!token && (
            <NavLink to="/register">
              <button className="button">Registro</button>
            </NavLink>
          )}

          {token && (
            <NavLink to="/publish">
              <button className="button">Publicar</button>
            </NavLink>
          )}

          {token && (
            <NavLink to="/">
              <button className="button" onClick={() => setToken(null)}>
                Logout
              </button>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS Header %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export { Header };
