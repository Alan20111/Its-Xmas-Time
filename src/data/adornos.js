// Catálogo de adornos por espacio.
// Cada adorno: { id, nombre, categoria, imagen }.
// No hay imágenes en el repo, así que cada imagen es un SVG simple (data URI),
// lo que además permite capturarlas después con html2canvas (US4).

export const CATEGORIAS = ['Luces', 'Esferas', 'Estrellas', 'Dibujos'];
export const MAX_ADORNOS = 10;

const svg = (contenido) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${contenido}</svg>`
  )}`;

const estrellaPts = (cx, cy, R, r) =>
  Array.from({ length: 10 }, (_, i) => {
    const rad = i % 2 ? r : R;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    return `${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

// ---------- Dibujos SVG ----------
const esfera = (color, tapa = '#D4A017') =>
  svg(`<rect x="43" y="10" width="14" height="12" rx="2" fill="${tapa}"/>
       <circle cx="50" cy="58" r="33" fill="${color}"/>
       <circle cx="38" cy="45" r="7" fill="#fff" opacity=".65"/>`);

const esferaColgante = (color) =>
  svg(`<line x1="50" y1="0" x2="50" y2="26" stroke="#8B5A2B" stroke-width="3"/>
       <rect x="44" y="24" width="12" height="9" rx="2" fill="#D4A017"/>
       <circle cx="50" cy="62" r="28" fill="${color}"/>
       <path d="M24 62 Q50 72 76 62" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/>
       <circle cx="40" cy="52" r="5" fill="#fff" opacity=".6"/>`);

const tiraLuces = (colores, cable = '#2E2E2E') => {
  const xs = [14, 32, 50, 68, 86];
  const ys = [42, 54, 58, 54, 42];
  return svg(`<path d="M4 34 Q50 70 96 34" stroke="${cable}" stroke-width="3" fill="none"/>
    ${xs
      .map(
        (x, i) => `<rect x="${x - 3}" y="${ys[i] - 4}" width="6" height="6" fill="${cable}"/>
                   <ellipse cx="${x}" cy="${ys[i] + 10}" rx="7" ry="10" fill="${colores[i % colores.length]}"/>`
      )
      .join('')}`);
};

const carambanos = svg(`<path d="M4 28 H96" stroke="#2E2E2E" stroke-width="3"/>
  ${[12, 30, 48, 66, 84]
    .map((x, i) => `<polygon points="${x - 7},30 ${x + 7},30 ${x},${62 + (i % 2) * 18}" fill="#BFE6FF" stroke="#7CC3F0" stroke-width="2"/>`)
    .join('')}`);

const estrella = (color, borde = 'none') =>
  svg(`<polygon points="${estrellaPts(50, 52, 44, 18)}" fill="${color}" stroke="${borde}" stroke-width="3" stroke-linejoin="round"/>`);

const baston = svg(`<path d="M42 92 V36 a16 16 0 0 1 32 0" stroke="#fff" stroke-width="13" fill="none" stroke-linecap="round"/>
  <path d="M42 92 V36 a16 16 0 0 1 32 0" stroke="#C0392B" stroke-width="13" fill="none" stroke-dasharray="9 9" stroke-linecap="round"/>`);

const campana = svg(`<path d="M50 14 C30 14 28 40 26 62 L18 74 H82 L74 62 C72 40 70 14 50 14 Z" fill="#D4A017"/>
  <rect x="46" y="6" width="8" height="10" rx="3" fill="#B8860B"/>
  <circle cx="50" cy="82" r="8" fill="#C0392B"/>`);

const mono = (color) =>
  svg(`<path d="M50 50 L14 28 Q6 50 14 72 Z" fill="${color}"/>
       <path d="M50 50 L86 28 Q94 50 86 72 Z" fill="${color}"/>
       <path d="M46 54 L34 92 L44 86 L50 94 L50 56 Z" fill="${color}" opacity=".85"/>
       <path d="M54 54 L66 92 L56 86 L50 94 L50 56 Z" fill="${color}" opacity=".85"/>
       <circle cx="50" cy="50" r="10" fill="${color}" stroke="#7A1F16" stroke-width="3"/>`);

const bota = svg(`<path d="M30 14 H62 V58 L84 66 Q92 70 88 82 Q84 92 70 92 H34 Q26 92 26 82 Z" fill="#C0392B"/>
  <rect x="24" y="8" width="44" height="16" rx="6" fill="#fff"/>
  <circle cx="74" cy="82" r="4" fill="#fff" opacity=".7"/>`);

const calcetin = svg(`<defs><pattern id="r" width="100" height="14" patternUnits="userSpaceOnUse">
    <rect width="100" height="7" fill="#1E7B4F"/><rect y="7" width="100" height="7" fill="#fff"/></pattern></defs>
  <path d="M30 14 H62 V58 L84 66 Q92 70 88 82 Q84 92 70 92 H34 Q26 92 26 82 Z" fill="url(#r)" stroke="#1E7B4F" stroke-width="2"/>
  <rect x="24" y="8" width="44" height="16" rx="6" fill="#C0392B"/>`);

const guirnalda = svg(`<path d="M4 30 Q50 80 96 30" stroke="#1E7B4F" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M4 30 Q50 80 96 30" stroke="#2E9E66" stroke-width="5" fill="none" stroke-dasharray="4 8" stroke-linecap="round"/>
  <circle cx="30" cy="48" r="5" fill="#C0392B"/><circle cx="50" cy="55" r="5" fill="#C0392B"/><circle cx="70" cy="48" r="5" fill="#C0392B"/>`);

const vela = (color) =>
  svg(`<rect x="36" y="38" width="28" height="52" rx="4" fill="${color}"/>
       <rect x="30" y="86" width="40" height="8" rx="3" fill="#D4A017"/>
       <line x1="50" y1="38" x2="50" y2="30" stroke="#333" stroke-width="2"/>
       <path d="M50 6 Q62 22 50 30 Q38 22 50 6 Z" fill="#F39C12"/>
       <path d="M50 14 Q56 22 50 28 Q44 22 50 14 Z" fill="#F7DC6F"/>`);

const corona = svg(`<circle cx="50" cy="50" r="32" fill="none" stroke="#1E7B4F" stroke-width="16"/>
  <circle cx="50" cy="50" r="32" fill="none" stroke="#2E9E66" stroke-width="5" stroke-dasharray="3 7"/>
  <circle cx="28" cy="34" r="4" fill="#C0392B"/><circle cx="74" cy="38" r="4" fill="#C0392B"/><circle cx="70" cy="70" r="4" fill="#C0392B"/>
  <path d="M50 76 L36 70 L36 90 Z M50 76 L64 70 L64 90 Z" fill="#C0392B"/><circle cx="50" cy="78" r="6" fill="#C0392B"/>`);

const muneco = svg(`<circle cx="50" cy="70" r="24" fill="#fff" stroke="#BFD4E6" stroke-width="3"/>
  <circle cx="50" cy="36" r="17" fill="#fff" stroke="#BFD4E6" stroke-width="3"/>
  <rect x="36" y="10" width="28" height="8" fill="#222"/><rect x="41" y="0" width="18" height="12" fill="#222"/>
  <circle cx="44" cy="33" r="2.5" fill="#222"/><circle cx="56" cy="33" r="2.5" fill="#222"/>
  <polygon points="50,38 64,41 50,43" fill="#E67E22"/>
  <path d="M34 50 H66 L62 56 H38 Z" fill="#C0392B"/>
  <circle cx="50" cy="64" r="2.5" fill="#222"/><circle cx="50" cy="74" r="2.5" fill="#222"/>`);

const copo = svg(`<g stroke="#5DADE2" stroke-width="6" stroke-linecap="round">
  ${[0, 60, 120].map((a) => `<line x1="50" y1="8" x2="50" y2="92" transform="rotate(${a} 50 50)"/>`).join('')}
  </g><g stroke="#5DADE2" stroke-width="4" stroke-linecap="round" fill="none">
  ${[0, 60, 120, 180, 240, 300].map((a) => `<path d="M40 20 L50 30 L60 20" transform="rotate(${a} 50 50)"/>`).join('')}
  </g>`);

const ventanaVela = svg(`<rect x="10" y="10" width="80" height="80" rx="6" fill="#FFF1B8" stroke="#C0392B" stroke-width="6"/>
  <line x1="50" y1="10" x2="50" y2="90" stroke="#C0392B" stroke-width="4"/>
  <line x1="10" y1="50" x2="90" y2="50" stroke="#C0392B" stroke-width="4"/>
  <path d="M10 10 Q30 40 22 90 H10 Z M90 10 Q70 40 78 90 H90 Z" fill="#1E7B4F"/>`);

// ---------- Catálogo por espacio ----------
export const ADORNOS = {
  chimenea: [
    { id: 'chi-bota-roja', nombre: 'Bota Roja', categoria: 'Dibujos', imagen: bota },
    { id: 'chi-calcetin', nombre: 'Calcetín a Rayas', categoria: 'Dibujos', imagen: calcetin },
    { id: 'chi-guirnalda', nombre: 'Guirnalda de Pino', categoria: 'Dibujos', imagen: guirnalda },
    { id: 'chi-luces', nombre: 'Luces de Colores', categoria: 'Luces', imagen: tiraLuces(['#E74C3C', '#F1C40F', '#2ECC71', '#3498DB']) },
    { id: 'chi-vela-roja', nombre: 'Vela Roja', categoria: 'Luces', imagen: vela('#C0392B') },
    { id: 'chi-vela-blanca', nombre: 'Vela Blanca', categoria: 'Luces', imagen: vela('#F5EFE6') },
    { id: 'chi-esfera-roja', nombre: 'Esfera Colgante Roja', categoria: 'Esferas', imagen: esferaColgante('#C0392B') },
    { id: 'chi-esfera-dorada', nombre: 'Esfera Colgante Dorada', categoria: 'Esferas', imagen: esferaColgante('#D4A017') },
  ],
  arbol: [
    { id: 'arb-esfera-roja', nombre: 'Esfera Roja', categoria: 'Esferas', imagen: esfera('#C0392B') },
    { id: 'arb-esfera-dorada', nombre: 'Esfera Dorada', categoria: 'Esferas', imagen: esfera('#D4A017', '#8B5A2B') },
    { id: 'arb-esfera-azul', nombre: 'Esfera Azul', categoria: 'Esferas', imagen: esfera('#2E86C1') },
    { id: 'arb-guirnalda-luces', nombre: 'Guirnalda de Luces', categoria: 'Luces', imagen: tiraLuces(['#F1C40F', '#C0392B', '#2ECC71']) },
    { id: 'arb-luces-blancas', nombre: 'Luces Blancas', categoria: 'Luces', imagen: tiraLuces(['#FFF7CC']) },
    { id: 'arb-estrella', nombre: 'Estrella de Belén', categoria: 'Estrellas', imagen: estrella('#D4A017', '#B8860B') },
    { id: 'arb-baston', nombre: 'Bastón Dulce', categoria: 'Dibujos', imagen: baston },
    { id: 'arb-campana', nombre: 'Campana', categoria: 'Dibujos', imagen: campana },
    { id: 'arb-mono', nombre: 'Moño Rojo', categoria: 'Dibujos', imagen: mono('#C0392B') },
  ],
  casa: [
    { id: 'cas-luces', nombre: 'Luces de Colores', categoria: 'Luces', imagen: tiraLuces(['#E74C3C', '#F1C40F', '#2ECC71', '#3498DB']) },
    { id: 'cas-carambanos', nombre: 'Luces Carámbano', categoria: 'Luces', imagen: carambanos },
    { id: 'cas-corona', nombre: 'Corona para Puerta', categoria: 'Dibujos', imagen: corona },
    { id: 'cas-guirnalda', nombre: 'Guirnalda de Pino', categoria: 'Dibujos', imagen: guirnalda },
    { id: 'cas-muneco', nombre: 'Muñeco de Nieve', categoria: 'Dibujos', imagen: muneco },
    { id: 'cas-copo', nombre: 'Copo de Nieve para Ventana', categoria: 'Estrellas', imagen: copo },
    { id: 'cas-estrella-ventana', nombre: 'Estrella para Ventana', categoria: 'Estrellas', imagen: estrella('#FFF1B8', '#D4A017') },
    { id: 'cas-ventana', nombre: 'Decoración de Ventana', categoria: 'Dibujos', imagen: ventanaVela },
  ],
};

export const buscarAdorno = (espacio, id) => ADORNOS[espacio]?.find((a) => a.id === id);
