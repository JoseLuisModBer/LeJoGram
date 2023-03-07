// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

import './EntrySearch.css';
import { useEffect, useState } from 'react';
import { Entry } from '../Entry/Entry';
import { useToken } from '../../TokenContext';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN EntrySearch %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const EntrySearch = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState(null);
  const [token] = useToken();

  // Usamos useEffect para que haga un fetch a la DB nada más entrar a la página LeJoGram.
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch('http://localhost:4000/entries', {
          headers: {
            Authorization: token,
          },
        });
        const body = await res.json();

        if (body.status === 'error') {
          alert(body.message);
        } else {
          setEntries(body.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Función para manejar el envio del formulario de buscar entradas.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:4000/entries?keyword=${keyword}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const body = await res.json();

      if (body.status === 'error') {
        alert(body.message);
      } else {
        setEntries(body.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-entrysearch">
      <h1>Listado de entradas</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          placeholder="Busca por palabras clave..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button disabled={loading}>🔎</button>
      </form>

      <ul className="ul-entrylist">
        {entries &&
          entries.map((entry) => {
            return (
              <Entry
                entry={entry}
                entries={entries}
                setEntries={setEntries}
                key={entry.id}
              />
            );
          })}
      </ul>
    </main>
  );
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS EntrySearch %%%%%%%%%%%%%%%%%%%%%%%%%

export { EntrySearch };
