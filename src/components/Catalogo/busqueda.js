export const normalizar = (texto) =>
  texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

export function buscarAdornos(adornos, texto) {
  const q = normalizar(texto);
  if (!q) return adornos;
  return adornos.filter((a) => normalizar(a.nombre).includes(q));
}

// Filtro por categoría (Luces, Esferas, Estrellas, Dibujos). null o 'Todos' = sin filtro.
export function filtrarPorCategoria(adornos, categoria) {
  if (!categoria || categoria === 'Todos') return adornos;
  return adornos.filter((a) => a.categoria === categoria);
}

// Primero la categoría y después el texto.
export const filtrarCatalogo = (adornos, categoria, texto) =>
  buscarAdornos(filtrarPorCategoria(adornos, categoria), texto);
