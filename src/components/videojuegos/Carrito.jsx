import { formatearPrecio } from '../../utils/formato';

// Panel del carrito. Props: carrito (lista de items), alQuitar (quita uno por id)
// y alVaciar (borra todo el carrito).
export default function Carrito({ carrito, alQuitar, alVaciar }) {
  // Suma el precio de todos los items (ya guardan el precio de oferta)
  const totalPrecio = carrito.reduce((suma, item) => suma + item.precio, 0);

  return (
    <aside className="caja-cp seccion-carrito">
      <h2 className="titulo-cont titulo-chico">
        <span>Carrito</span> <span className="badge rounded-pill insignia">{carrito.length}</span>
      </h2>

      {/* Renderizado condicional: mensaje si el carrito está vacío */}
      {carrito.length === 0 ? (
        <p className="mb-0">Aún no has agregado videojuegos.</p>
      ) : (
        <>
          <ul className="list-group list-group-flush mb-3">
            {carrito.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center gap-2 px-0"
              >
                <div>
                  <div className="item-carrito-titulo">{item.titulo}</div>
                  <div className="item-carrito-precio">{formatearPrecio(item.precio)}</div>
                </div>
                <button type="button" className="btn btn-cp btn-secundario btn-sm" onClick={() => alQuitar(item.id)}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between fw-bold mb-2">
            <span>Total:</span>
            <span id="total-precio">{formatearPrecio(totalPrecio)}</span>
          </div>

          <button type="button" className="btn btn-cp btn-secundario w-100" onClick={alVaciar}>
            Vaciar carrito
          </button>
        </>
      )}
    </aside>
  );
}