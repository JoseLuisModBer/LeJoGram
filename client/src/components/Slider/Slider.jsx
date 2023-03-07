// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

// Importamos los estilos de Slider.module.css
import estilos from './Slider.module.css';
import { useState } from 'react';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN Slider %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const Slider = ({ entry }) => {
  const entryImages = entry.photos;
  const urlImagenes = entryImages.map((photo) => {
    return `http://localhost:4000/${photo.photo_name}`;
  });

  // Creamos un estado para la imagen actual. La imagen actual va a ser la que esté en primera posicíón (posición cero) del array de imágenes.
  const [imagenActual, setImagenActual] = useState(0);

  // Creamos una variable para saber cuántas imágenes hay en el array de imágenes
  const cantidad = urlImagenes?.length;

  // Return prematuro para evitar errores: Si el array de imágenes no es un array y si la cantidad de imágenes que contiene el array es cero; return.
  if (cantidad === 0) {
    return;
  }

  // Función manejadora del botón para foto anterior:
  const handleBack = () => {
    setImagenActual(imagenActual === 0 ? cantidad - 1 : imagenActual - 1);
  };

  // Función manejadora del botón para foto siguiente:
  const handleNext = () => {
    setImagenActual(imagenActual === cantidad - 1 ? 0 : imagenActual + 1);
  };

  // Div que contiene botón de anterior + mapeado del array de imágenes que retorna una imagen en cada vuelta + botón de siguiente.
  // Dentro del div del map: Si la imagen actual del mapeado corresponde al index, muestra la imagen.
  return (
    <div className={estilos.container1}>
      {urlImagenes.length > 1 ? (
        <button className={estilos.buttonizda} onClick={handleBack}>
          <img className={estilos.imgizda} src="/izquierda.png"></img>
        </button>
      ) : null}

      {urlImagenes.map((imagen, index) => {
        return (
          <div
            key={index}
            className={
              imagenActual === index
                ? `${estilos.slide} ${estilos.active}`
                : estilos.slide
            }
          >
            {imagenActual === index && (
              <img className={estilos.image} src={imagen} alt="imagen" />
            )}
          </div>
        );
      })}

      {urlImagenes.length > 1 ? (
        <button className={estilos.buttondcha} onClick={handleNext}>
          <img className={estilos.imgdcha} src="/derecha.png"></img>
        </button>
      ) : null}
    </div>
  );
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS Slider %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export { Slider };
