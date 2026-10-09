import { useState } from 'react';

// Valores iniciales del formulario (también sirve para limpiarlo después de enviar)
const CAMPOS_INICIALES = { nombre: '', correo: '', motivo: '', detalle: '' };

// Valida el formato del correo con una expresión regular simple
function correoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

export default function Contacto() {
  // Estados: valores de los campos, errores de validación y mensaje de éxito
  const [campos, setCampos] = useState(CAMPOS_INICIALES);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  // Actualiza el campo que cambió usando su id como clave
  function manejarCambio(evento) {
    const { id, value } = evento.target;
    setCampos((anteriores) => ({ ...anteriores, [id]: value }));
  }

  // Valida los campos y, si todo está bien, simula el envío
  function manejarEnvio(evento) {
    evento.preventDefault();
    const nuevosErrores = {};

    if (campos.nombre.trim() === '') nuevosErrores.nombre = 'Debe ingresar un nombre';
    if (!correoValido(campos.correo.trim())) nuevosErrores.correo = 'Debe ingresar un correo válido';
    if (campos.motivo === '') nuevosErrores.motivo = 'Debe seleccionar un motivo';
    if (campos.detalle.trim() === '') nuevosErrores.detalle = 'Debe ingresar el detalle de su mensaje';

    setErrores(nuevosErrores);
    setEnviado(false);

    // Si hay errores, se detiene el envío
    if (Object.keys(nuevosErrores).length > 0) return;

    // Envío exitoso: muestra el mensaje y limpia el formulario
    setEnviado(true);
    setCampos(CAMPOS_INICIALES);
  }

  return (
    <div className="contacto-grid">
      <section className="caja-cp">
        <h2 className="titulo-cont"><span>Contacto</span></h2>

        {/* Renderizado condicional: mensaje de éxito solo tras enviar */}
        {enviado && <div className="alerta-exito">¡Hemos enviado su requerimiento!</div>}

        <form onSubmit={manejarEnvio} noValidate>
          <div className="form-grupo">
            <label className="form-label" htmlFor="nombre">Nombre</label>
            <input id="nombre" type="text" className="input-cp" value={campos.nombre} onChange={manejarCambio} autoComplete="name" />
            {errores.nombre && <div className="error-campo">{errores.nombre}</div>}
          </div>

          <div className="form-grupo">
            <label className="form-label" htmlFor="correo">Correo</label>
            <input id="correo" type="email" className="input-cp" value={campos.correo} onChange={manejarCambio} autoComplete="email" />
            {errores.correo && <div className="error-campo">{errores.correo}</div>}
          </div>

          <div className="form-grupo">
            <label className="form-label" htmlFor="motivo">Motivo</label>
            <select id="motivo" className="select-cp" value={campos.motivo} onChange={manejarCambio}>
              <option value="">Selecciona un motivo</option>
              <option value="consulta">Consulta</option>
              <option value="reclamo">Reclamo</option>
              <option value="sugerencia">Sugerencia</option>
              <option value="otro">Otro</option>
            </select>
            {errores.motivo && <div className="error-campo">{errores.motivo}</div>}
          </div>

          <div className="form-grupo">
            <label className="form-label" htmlFor="detalle">Detalle</label>
            <textarea id="detalle" className="textarea-cp" rows="6" value={campos.detalle} onChange={manejarCambio} />
            {errores.detalle && <div className="error-campo">{errores.detalle}</div>}
          </div>

          <button type="submit" className="btn-cp btn-principal">Enviar</button>
        </form>
      </section>

      {/* Datos de la tienda */}
      <aside className="caja-cp">
        <h3 className="titulo-cont titulo-chico"><span>Nuestra tienda</span></h3>
        <p>Av. Providencia 456, Santiago</p>
        <p>Lunes a sábado, de 10:00 a 19:00</p>
        <p>contacto@cyberpulse.cl<br />+56 9 1234 5678</p>
      </aside>
    </div>
  );
}