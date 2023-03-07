// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

import './CreateEntry.css';
import { useToken } from '../../TokenContext';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CreateEntry %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const CreateEntry = () => {
  const [token] = useToken();
  const navigate = useNavigate();
  const [photo_1, setPhoto_1] = useState(null);
  const [photo_2, setPhoto_2] = useState(null);
  const [photo_3, setPhoto_3] = useState(null);
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Si NO estamos logueados redireccionamos a la página principal.
  if (!token) return <Navigate to="/" />;

  // Función que maneja el evento submit del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // NOTA: Si queremos enviar un body con formato "form/data" es necesario crear un objeto de tipo FormData y "pushear" los elementos que queramos enviar.
      const formData = new FormData();

      // NOTA: Pusheamos las propiedades con append (no confundir este método con el append de DOM).
      formData.append('place', place);
      formData.append('description', description);
      formData.append('photo_1', photo_1);
      formData.append('photo_2', photo_2);
      formData.append('photo_3', photo_3);

      const res = await fetch('http://127.0.0.1:4000/entries', {
        method: 'post',
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const body = await res.json();

      if (body.status === 'error') {
        alert(body.message);
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <form className="form-createentryform-container" onSubmit={handleSubmit}>
        <h2>Crea tu nueva entrada:</h2>
        <p>
          Puedes cargar hasta 3 fotografías por publicacíon pero siempre tiene
          que haber al menos una. Los campos "Ubicación" y "Descripción" son
          obligatorios.
        </p>

        <div className="div-photoselector-container">
          <h3>Selecciona hasta 3 fotografías:</h3>

          <input
            type="file"
            required
            onChange={(e) => setPhoto_1(e.target.files[0])}
          />
          <input type="file" onChange={(e) => setPhoto_2(e.target.files[0])} />
          <input type="file" onChange={(e) => setPhoto_3(e.target.files[0])} />
        </div>

        <div className="div-textarea-button-container">
          <textarea
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            minLength="2"
            required
            placeholder="Ubicación..."
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minLength="10"
            maxLength="250"
            required
            placeholder="Descripción..."
          />

          <button disabled={loading}>Enviar</button>
        </div>
      </form>
    </main>
  );
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS CreateEntry %%%%%%%%%%%%%%%%%%%%%%%%%

export { CreateEntry };
