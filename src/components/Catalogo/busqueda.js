export const normalizar = (texto) =>
  texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

export function buscarAdornos(adornos, texto) {
  const q = normalizar(texto);
  if (!q) return adornos;
  return adornos.filter((a) => normalizar(a.nombre).includes(q));
}
