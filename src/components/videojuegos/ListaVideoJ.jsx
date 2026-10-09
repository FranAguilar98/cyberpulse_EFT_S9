import TarjetaVideoJ from './TarjetaVideoJ';
import Cargando from '../../Cargando';

export default function ListaVideoJ({
  videojuegos,
  cargando,
  maximo,
  categoria = 'todos',
  busqueda = '',
  carrito,
  alAgregar,
  alQuitar,
}) {
  // Renderizado condicional: mientras carga, muestra el indicador
  if (cargando) return <Cargando />;

  let lista = videojuegos;

  if (maximo) {
    // En Inicio: solo los primeros N videojuegos destacados
    lista = lista.slice(0, maximo);
  } else {
    // En Producto: filtra por categoría y por texto de búsqueda
    lista = lista.filter((juego) => {
      const coincideCategoria = categoria === 'todos' || juego.categoria === categoria;
      const coincideBusqueda = juego.titulo.toLowerCase().includes(busqueda.toLowerCase());
      return coincideCategoria && coincideBusqueda;
    });
  }

  // Renderizado condicional: mensaje si no hay resultados
  if (lista.length === 0) {
    return (
      <p className="text-center py-4 mb-0">
        No encontramos videojuegos con esos criterios. Prueba con otra búsqueda o categoría.
      </p>
    );
  }

  return (
    // Grilla de Bootstrap: 1 columna en celular, 2 en tablet y 3 en pantallas grandes
    <div className="row g-4">
      {lista.map((producto) => (
        <div key={producto.id} className="col-12 col-md-6 col-xl-4">
          {/* Cada tarjeta recibe el carrito para alternar su botón agregar / quitar */}
          <TarjetaVideoJ
            producto={producto}
            carrito={carrito}
            alAgregar={alAgregar}
            alQuitar={alQuitar}
          />
        </div>
      ))}
    </div>
  );
}