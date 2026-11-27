// Ilustraciones SVG de los espacios (no hay imágenes en el repo, se dibujan aquí).
// Todas usan el mismo viewBox 480×560 para que las posiciones en % sean estables.

export const VIEWBOX = { ancho: 480, alto: 560 };

function puntosEstrella(cx, cy, R, r, picos = 5) {
  const pts = [];
  for (let i = 0; i < picos * 2; i++) {
    const rad = i % 2 === 0 ? R : r;
    const ang = (Math.PI / picos) * i - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(ang)).toFixed(1)},${(cy + rad * Math.sin(ang)).toFixed(1)}`);
  }
  return pts.join(' ');
}

function Arbol({ decorado }) {
  return (
    <>
      <ellipse cx="240" cy="528" rx="200" ry="22" fill="#EFE3D6" />
      <rect x="207" y="455" width="66" height="70" rx="6" fill="#8B5A2B" />
      <polygon
        fill="#1E7B4F"
        points="240,52 345,180 300,180 405,320 352,320 460,462 20,462 128,320 75,320 180,180 135,180"
      />
      <polygon fill="#D4A017" points={puntosEstrella(240, 52, 40, 17)} />
      {decorado && (
        <g>
          <circle cx="205" cy="230" r="16" fill="#C0392B" />
          <circle cx="290" cy="270" r="14" fill="#D4A017" />
          <circle cx="240" cy="360" r="18" fill="#C0392B" />
          <circle cx="160" cy="400" r="15" fill="#D4A017" />
          <circle cx="330" cy="410" r="14" fill="#D4A017" />
        </g>
      )}
    </>
  );
}

function Chimenea({ decorado }) {
  return (
    <>
      <ellipse cx="240" cy="532" rx="215" ry="20" fill="#EFE3D6" />
      <rect x="55" y="178" width="370" height="340" fill="#A0522D" />
      {[230, 290, 350, 410, 470].map((y, i) => (
        <line key={y} x1="55" x2="425" y1={y} y2={y} stroke="#8B4423" strokeWidth="3" />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={105 + i * 60 + (i % 2) * 0} x2={105 + i * 60} y1="178" y2="518" stroke="#8B4423" strokeWidth="2" opacity="0.35" />
      ))}
      <rect x="25" y="150" width="430" height="34" rx="6" fill="#5B2E14" />
      <rect x="135" y="280" width="210" height="238" rx="14" fill="#2B1A12" />
      <rect x="170" y="478" width="140" height="18" rx="9" fill="#6B3A1E" />
      <polygon points="240,330 285,480 195,480" fill="#E67E22" />
      <polygon points="240,385 266,480 214,480" fill="#F1C40F" />
      <rect x="35" y="512" width="410" height="16" rx="4" fill="#5B2E14" />
      {decorado && (
        <g>
          <path d="M45 190 Q 140 230 240 196 Q 340 230 435 190" stroke="#1E7B4F" strokeWidth="10" fill="none" />
          <rect x="120" y="190" width="26" height="50" rx="8" fill="#C0392B" />
          <rect x="334" y="190" width="26" height="50" rx="8" fill="#C0392B" />
        </g>
      )}
    </>
  );
}

function Casa({ decorado }) {
  return (
    <>
      <ellipse cx="240" cy="525" rx="220" ry="24" fill="#EFE3D6" />
      <rect x="330" y="110" width="44" height="100" fill="#8B4513" />
      <rect x="75" y="245" width="330" height="270" rx="6" fill="#C0392B" />
      <polygon points="240,95 445,255 35,255" fill="#8B4513" />
      <polyline points="28,262 240,96 452,262" fill="none" stroke="#FFFFFF" strokeWidth="18" strokeLinejoin="round" strokeLinecap="round" />
      <rect x="203" y="375" width="74" height="140" rx="6" fill="#6B3A1E" />
      <circle cx="264" cy="450" r="5" fill="#D4A017" />
      <rect x="110" y="300" width="70" height="60" rx="6" fill="#FFF1B8" />
      <rect x="300" y="300" width="70" height="60" rx="6" fill="#FFF1B8" />
      <line x1="145" x2="145" y1="300" y2="360" stroke="#E8D38A" strokeWidth="3" />
      <line x1="335" x2="335" y1="300" y2="360" stroke="#E8D38A" strokeWidth="3" />
      {decorado && (
        <g>
          <circle cx="240" cy="415" r="20" fill="none" stroke="#1E7B4F" strokeWidth="8" />
          <circle cx="425" cy="460" r="22" fill="#FFFFFF" />
          <circle cx="425" cy="425" r="15" fill="#FFFFFF" />
        </g>
      )}
    </>
  );
}

const ESCENAS = { arbol: Arbol, chimenea: Chimenea, casa: Casa };

export function Escena({ espacio, decorado = false, className, ...resto }) {
  const Comp = ESCENAS[espacio];
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.ancho} ${VIEWBOX.alto}`}
      className={className}
      role="img"
      aria-label={`Ilustración: ${espacio}`}
      {...resto}
    >
      <Comp decorado={decorado} />
    </svg>
  );
}
