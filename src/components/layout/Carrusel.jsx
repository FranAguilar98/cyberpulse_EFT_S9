import { useState } from 'react';

const base = import.meta.env.BASE_URL;

const slides = [
  { src: `${base}img/banner_inicio.jpg`, alt: 'Bienvenido a CyberPulse Gaming' },
  { src: `${base}img/banner_productos.jpg`, alt: 'Los mejores videojuegos en CyberPulse Gaming' },
  { src: `${base}img/banner_redes.jpg`, alt: 'CyberPulse Gaming en redes sociales' },
];

export default function Carrusel() {
  const [indice, setIndice] = useState(0);

  function anterior() {
    setIndice((actual) => (actual === 0 ? slides.length - 1 : actual - 1));
  }

  function siguiente() {
    setIndice((actual) => (actual === slides.length - 1 ? 0 : actual + 1));
  }

  return (
    <div className="carrusel-contenedor">
      <img className="carrusel-slide" src={slides[indice].src} alt={slides[indice].alt} />

      <button type="button" className="carrusel-btn prev" onClick={anterior} aria-label="Anterior">‹</button>
      <button type="button" className="carrusel-btn next" onClick={siguiente} aria-label="Siguiente">›</button>

      <div className="carrusel-indicadores">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`indicador-punto ${i === indice ? 'activo' : ''}`}
            onClick={() => setIndice(i)}
            aria-label={`Diapositiva ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}