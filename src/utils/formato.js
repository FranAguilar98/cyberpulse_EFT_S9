// Formatea un número como precio en pesos chilenos
export function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(valor)
}

// Devuelve la lista de categorías sin repetir, empezando por "Todas"
export function obtenerCategorias(videojuegos) {
  return ['Todas', ...new Set(videojuegos.map((j) => j.categoria))]
}