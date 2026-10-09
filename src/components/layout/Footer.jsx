// Pie de página con tres columnas: quiénes somos, contacto y redes sociales.
// Es un componente estático: no recibe props ni maneja estado.
export default function Footer() {
  return (
    <footer className="caja-cp pie-cp">
      {/* Columna: descripción de la tienda */}
      <div className="pie-columna">
        <h4>Quiénes somos</h4>
        <p>Tienda online de videojuegos creada por y para gamers.</p>
      </div>

      {/* Columna: datos de contacto */}
      <div className="pie-columna">
        <h4>Contacto</h4>
        <p>contacto@cyberpulse.cl</p>
        <p>+56 9 1234 5678</p>
      </div>

      {/* Columna: enlaces a redes sociales (se abren en una pestaña nueva) */}
      <div className="pie-columna">
        <h4>Síguenos</h4>
        <p><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></p>
        <p><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></p>
        <p><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a></p>
      </div>
    </footer>
  );
}