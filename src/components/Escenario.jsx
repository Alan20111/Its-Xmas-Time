import { buscarEspacio } from '../data/espacios.js';
import { Escena } from './Ilustraciones.jsx';

// Escenario de decoración (frame 03_Escenario_vacio).
export default function Escenario({ espacioId, onVolver }) {
  const espacio = buscarEspacio(espacioId);

  return (
    <div className="decorar">
      <header className="barra">
        <button type="button" className="barra__volver" onClick={onVolver} aria-label="Volver a elegir espacio" title="Volver a elegir espacio">
          ←
        </button>
        <h1 className="barra__titulo">Escenario: {espacio.titulo}</h1>
        <span className="pildora pildora--verde barra__derecha">Listo para decorar ✨</span>
      </header>

      <section className="zona-escenario zona-escenario--completa">
        <div className="escenario" data-espacio={espacio.id}>
          <Escena espacio={espacio.id} className="escenario__fondo" />
        </div>
        <div className="aviso-flotante">
          <strong>{espacio.emoji} ¡Tu {espacio.nombre.toLowerCase()} está listo!</strong>
          <span>En el siguiente paso podrás arrastrar adornos desde el catálogo</span>
        </div>
      </section>
    </div>
  );
}
