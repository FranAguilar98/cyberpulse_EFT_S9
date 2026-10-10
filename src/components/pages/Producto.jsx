import { useState, useEffect } from 'react';
import ListaVideoJ from '../videojuegos/ListaVideoJ';
import Carrito from '../videojuegos/Carrito';

// Categorías disponibles para filtrar el catálogo
const CATEGORIAS = ['todos', 'Acción', 'Aventura', 'Terror'];

export default function Producto({ videojuegos, cargando, categoriaInicial, alAgregar, carrito, alQuitar, alVaciar }) {
  // Estados: categoría activa, texto del input y búsqueda aplicada
  const [categoria, setCategoria] = useState(categoriaInicial);
  const [busquedaInput, setBusquedaInput] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // useEffect: sincroniza la categoría cuando llega una nueva desde fuera
  useEffect(() => {
    setCategoria(categoriaInicial);
  }, [categoriaInicial]);

  // Aplica la búsqueda solo al enviar el formulario
  function manejarBusqueda(evento) {
    evento.preventDefault();
    setBusqueda(busquedaInput.trim());
  }

  return (
    // Grilla de Bootstrap: catálogo a la izquierda y carrito a la derecha
    <div className="row g-4 align-items-start">
      <div className="col-12 col-lg-9">
        <section className="caja-cp">
          <h2 className="titulo-cont">
            <span>{categoria === 'todos' ? 'Todos los videojuegos' : categoria}</span>
          </h2>

          <form onSubmit={manejarBusqueda} className="input-group mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="Buscar por título..."
              aria-label="Buscar por título"
              value={busquedaInput}
              onChange={(e) => setBusquedaInput(e.target.value)}
            />
            <button type="submit" className="btn btn-cp btn-principal">Buscar</button>
          </form>

          <div className="d-flex flex-wrap gap-2 mb-4">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn btn-sm btn-pill ${categoria === cat ? 'activa' : ''}`}
                onClick={() => setCategoria(cat)}
              >
                {cat === 'todos' ? 'Todos' : cat}
              </button>
            ))}
          </div>

          {/* Se pasan carrito y alQuitar para que cada tarjeta alterne su botón */}
          <ListaVideoJ
            videojuegos={videojuegos}
            cargando={cargando}
            categoria={categoria}
            busqueda={busqueda}
            carrito={carrito}
            alAgregar={alAgregar}
            alQuitar={alQuitar}
          />
        </section>
      </div>

      {/* Panel del carrito: lista, total y botón para vaciar */}
      <div className="col-12 col-lg-3">
        <Carrito carrito={carrito} alQuitar={alQuitar} alVaciar={alVaciar} />
      </div>
    </div>
  );
}