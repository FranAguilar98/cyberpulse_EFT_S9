// Encabezado con logo, botón del carrito y menú de navegación.
// Props: vista (página actual), setVista (cambia de página),
// irAProducto (va al catálogo) y totalCarrito (cantidad de productos).
export default function Header({ vista, setVista, irAProducto, totalCarrito }) {
  return (
    <>
      <header className="caja-cp header-cp">
        {/* Logo: vuelve a la página de inicio */}
        <button type="button" className="logo-link" onClick={() => setVista('inicio')}>
          <span className="logo-cp" aria-hidden="true"></span>
          <span className="logo-texto">Cyber<span>Pulse</span> Gaming</span>
        </button>

        <div className="header-acciones">
          {/* Botón del carrito: lleva al catálogo y muestra el contador */}
          <button type="button" className="btn-carrito-header" onClick={() => irAProducto('todos')}>
            Carrito <span className="badge-contador">{totalCarrito}</span>
          </button>
        </div>
      </header>

      {/* Menú principal: la clase "activo" marca la página actual */}
      <nav className="caja-cp navbar-cp" aria-label="Menú principal">
        <ul className="nav-links">
          <li>
            <button
              type="button"
              className={`nav-link-cp ${vista === 'inicio' ? 'activo' : ''}`}
              onClick={() => setVista('inicio')}
            >
              <span>Inicio</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav-link-cp ${vista === 'producto' ? 'activo' : ''}`}
              onClick={() => irAProducto('todos')}
            >
              <span>Productos</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav-link-cp ${vista === 'contacto' ? 'activo' : ''}`}
              onClick={() => setVista('contacto')}
            >
              <span>Contacto</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}