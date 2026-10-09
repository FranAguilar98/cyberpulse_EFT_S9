export default function Cargando() {
  return (
    <div className="d-flex flex-column align-items-center py-5" role="status" aria-live="polite">
      <div className="spinner-border text-info" aria-hidden="true"></div>
      <p className="mt-3 mb-0 text-info">Cargando videojuegos...</p>
    </div>
  );
}