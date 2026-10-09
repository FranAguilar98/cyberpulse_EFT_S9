import Carrusel from '../layout/Carrusel';
import ListaVideoJ from '../videojuegos/ListaVideoJ';

export default function Inicio({ videojuegos, cargando, carrito, alAgregar, alQuitar, irAProducto }) {
  return (
    <>
      <div className="caja-cp">
        <Carrusel />
      </div>

      <section className="caja-cp">
        <h2 className="titulo-cont"><span>Destacados</span></h2>
        {/* Se pasan carrito y alQuitar para que cada tarjeta pueda alternar su botón */}
        <ListaVideoJ
          videojuegos={videojuegos}
          cargando={cargando}
          maximo={3}
          carrito={carrito}
          alAgregar={alAgregar}
          alQuitar={alQuitar}
        />
        <button type="button" className="btn-cp btn-secundario mt-2" onClick={() => irAProducto('todos')}>
          Ver todos los videojuegos
        </button>
      </section>
    </>
  );
}