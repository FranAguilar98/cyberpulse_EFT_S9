import { useState } from 'react';

// Encabezado con logo, botón del carrito y menú de navegación (navbar de Bootstrap).
// Props: vista (página actual), setVista (cambia de página),
// irAProducto (va al catálogo) y totalCarrito (cantidad de productos).
export default function Header({ vista, setVista, irAProducto, totalCarrito }) {
  // Estado del menú desplegable en celular (abierto o cerrado)
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Cambia de página y cierra el menú
  function irA(pagina) {
    setVista(pagina);
    setMenuAbierto(false);
  }

  // Va al catálogo completo y cierra el menú
  function irAProductos() {
    irAProducto('todos');
    setMenuAbierto(false);
  }

  return (
    <>
      <header className="caja-cp header-cp">
        {/* Logo: vuelve a la página de inicio */}
        <button type="button" className="logo-link" onClick={() => irA('inicio')}>
          <span className="logo-cp" aria-hidden="true"></span>
          <span className="logo-texto">Cyber<span>Pulse</span> Gaming</span>
        </button>

        <div className="header-acciones">
          {/* Botón del carrito: lleva al catálogo y muestra el contador */}
          <button type="button" className="btn-carrito-header" onClick={irAProductos}>
            Carrito <span className="badge-contador">{totalCarrito}</span>
          </button>
        </div>
      </header>

      {/* Menú principal: navbar de Bootstrap. En pantallas chicas se colapsa
          y se abre con el botón de hamburguesa (navbar-toggler). */}
      <nav className="navbar navbar-expand-md navbar-dark caja-cp navbar-cp" aria-label="Menú principal">
        <div className="container-fluid">
          <button
            type="button"
            className="navbar-toggler ms-auto"
            aria-controls="menu-principal"
            aria-expanded={menuAbierto}
            aria-label="Mostrar u ocultar el menú"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            id="menu-principal"
            className={`collapse navbar-collapse justify-content-center ${menuAbierto ? 'show' : ''}`}
          >
            <ul className="navbar-nav gap-md-2">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link nav-link-cp ${vista === 'inicio' ? 'activo' : ''}`}
                  aria-current={vista === 'inicio' ? 'page' : undefined}
                  onClick={() => irA('inicio')}
                >
                  Inicio
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link nav-link-cp ${vista === 'producto' ? 'activo' : ''}`}
                  aria-current={vista === 'producto' ? 'page' : undefined}
                  onClick={irAProductos}
                >
                  Productos
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link nav-link-cp ${vista === 'contacto' ? 'activo' : ''}`}
                  aria-current={vista === 'contacto' ? 'page' : undefined}
                  onClick={() => irA('contacto')}
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}