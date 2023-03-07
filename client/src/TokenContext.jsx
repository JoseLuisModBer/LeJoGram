// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

import { createContext, useState, useContext, useEffect } from 'react';

const TokenContext = createContext(null);

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN TokenProvider %%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  // Usamos un useEffect para conseguir los datos de un usuario en concreto (usuario logueado):
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://127.0.0.1:4000/users', {
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
    if (token) fetchUser();
  }, [token]);

  const setTokenInLocalStorage = (newToken) => {
    if (!newToken) {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } else {
      localStorage.setItem('token', newToken);
    }

    setToken(newToken);
  };

  return (
    <TokenContext.Provider
      value={[token, setTokenInLocalStorage, user, setUser]}
    >
      {children}
    </TokenContext.Provider>
  );
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN useToken %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const useToken = () => {
  return useContext(TokenContext);
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS TokenProvider y useToken %%%%%%%%%%%%%%

export { TokenProvider, useToken };
