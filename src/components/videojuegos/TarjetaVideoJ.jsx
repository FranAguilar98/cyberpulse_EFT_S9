import { formatearPrecio } from '../../utils/formato';

export default function TarjetaVideoJ({ producto, carrito, alAgregar, alQuitar }) {
  // Porcentaje de descuento entre precio normal y precio oferta
  const descuento = Math.round(
    ((producto.precio - producto.precioOferta) / producto.precio) * 100
  );

  // Revisa si este producto ya está en el carrito
  function existeEnCarrito() {
    return carrito.some((item) => item.id === producto.id);
  }

  return (
    <article className="card card-cp h-100" aria-label={`Producto: ${producto.titulo}`}>
      <div className="card-imagen-wrapper">
        <img
          className="card-img-top"
          src={`${import.meta.env.BASE_URL}img/${producto.img}`}
          alt={`Portada de ${producto.titulo}`}
        />
        {descuento > 0 && <span className="badge badge-descuento">-{descuento}%</span>}
      </div>

      <div className="card-body d-flex flex-column gap-2">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span className="badge rounded-pill etiqueta-categoria">{producto.categoria}</span>
          <small className="card-autor">{producto.desarrollador}</small>
        </div>

        <h3 className="card-title h5 mb-0">{producto.titulo}</h3>
        <p className="card-text card-descripcion flex-grow-1 mb-0">{producto.descripcion}</p>

        <div className="d-flex align-items-baseline gap-2">
          <span className="precio-normal">{formatearPrecio(producto.precio)}</span>
          <span className="precio-oferta">{formatearPrecio(producto.precioOferta)}</span>
        </div>

        {/* Renderizado condicional: el botón cambia según si está en el carrito */}
        {!existeEnCarrito() ? (
          <button type="button" className="btn btn-cp btn-principal w-100" onClick={() => alAgregar(producto)}>
            Agregar al carrito
          </button>
        ) : (
          <button type="button" className="btn btn-cp btn-quitar w-100" onClick={() => alQuitar(producto.id)}>
            En el carrito · Quitar
          </button>
        )}
      </div>
    </article>
  );
}