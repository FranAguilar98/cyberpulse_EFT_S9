import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Inicio from './components/pages/Inicio';
import Producto from './components/pages/Producto';
import Contacto from './components/pages/Contacto';
import './App.css';

function App() {
  // Estado de navegación: qué página se muestra y qué categoría está filtrada
  const [vista, setVista] = useState('inicio');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');

  // Estado del catálogo y de la carga de datos
  const [videojuegos, setVideojuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estado del carrito: guarda objetos con id, título y precio de oferta.
  // Se lee de localStorage al iniciar, así no se pierde al recargar la página.
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('carrito-cyberpulse');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  // useEffect: carga los datos externos con fetch desde public/datos.json
  useEffect(() => {
    const controlador = new AbortController();

    async function cargarDatos() {
      try {
        const respuesta = await fetch(`${import.meta.env.BASE_URL}datos.json`, {
          signal: controlador.signal,
        });
        if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
        const datos = await respuesta.json();

        // Espera de 1 segundo para que se alcance a ver el estado de carga
        await new Promise((resolver) => setTimeout(resolver, 1000));
        if (controlador.signal.aborted) return;

        setVideojuegos(datos);
        setError(null);
        setCargando(false);
      } catch (e) {
        if (e.name === 'AbortError') return;
        setError('No se pudo cargar el catálogo. Intenta nuevamente.');
        setCargando(false);
      }
    }

    cargarDatos();

    // Limpieza: cancela la petición si el componente se desmonta
    return () => controlador.abort();
  }, []);

  // useEffect: guarda el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('carrito-cyberpulse', JSON.stringify(carrito));
  }, [carrito]);

  // Agrega un producto al carrito (si ya está, no lo duplica)
  function agregarACarrito(producto) {
    setCarrito((actual) => {
      if (actual.some((item) => item.id === producto.id)) return actual;
      return [...actual, { id: producto.id, titulo: producto.titulo, precio: producto.precioOferta }];
    });
  }

  // Quita un producto del carrito por su id
  function quitarDelCarrito(id) {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  }

  // Vacía el carrito completo
  function vaciarCarrito() {
    setCarrito([]);
  }

  // Cambia a la vista de productos con una categoría seleccionada
  function irAProducto(categoria = 'todos') {
    setCategoriaFiltro(categoria);
    setVista('producto');
  }

  return (
    <div className="app-contenedor">
      <Header vista={vista} setVista={setVista} irAProducto={irAProducto} totalCarrito={carrito.length} />

      {/* Renderizado condicional: aviso si falló la carga del catálogo */}
      {error && vista !== 'contacto' && (
        <div className="alert alert-danger mb-0" role="alert">{error}</div>
      )}

      {/* Renderizado condicional de páginas según la vista actual */}
      {vista === 'inicio' && !error && (
        <Inicio
          videojuegos={videojuegos}
          cargando={cargando}
          carrito={carrito}
          alAgregar={agregarACarrito}
          alQuitar={quitarDelCarrito}
          irAProducto={irAProducto}
        />
      )}

      {vista === 'producto' && !error && (
        <Producto
          videojuegos={videojuegos}
          cargando={cargando}
          categoriaInicial={categoriaFiltro}
          carrito={carrito}
          alAgregar={agregarACarrito}
          alQuitar={quitarDelCarrito}
          alVaciar={vaciarCarrito}
        />
      )}

      {vista === 'contacto' && <Contacto />}

      <Footer />
    </div>
  );
}

export default App;