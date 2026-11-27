import { useCallback, useEffect, useRef, useState } from 'react';
import { buscarEspacio } from '../data/espacios.js';
import { ADORNOS, MAX_ADORNOS, buscarAdorno } from '../data/adornos.js';
import { Escena } from './Ilustraciones.jsx';
import Catalogo from './Catalogo/Catalogo.jsx';
import Modal from './Modal.jsx';

const UMBRAL_ARRASTRE = 6; // px antes de considerar que el usuario está arrastrando
const limitar = (v) => Math.min(100, Math.max(0, v));
const plural = (n) => `${n} adorno${n === 1 ? '' : 's'}`;

// US3 – Colocar adornos (frames 04 a 07).
export default function Escenario({ espacioId, onVolver }) {
  const espacio = buscarEspacio(espacioId);
  const adornos = ADORNOS[espacioId];
  const nombreLargo = espacio.articulo.split(' ').slice(1).join(' ');

  // Adornos colocados: posición en % del escenario para que no se muevan al cambiar el tamaño.
  const [colocados, setColocados] = useState([]); // [{ uid, adornoId, x, y }]
  const [seleccionado, setSeleccionado] = useState(null); // uid de un adorno colocado
  const [catalogoSel, setCatalogoSel] = useState(null); // id de adorno del catálogo listo para arrastrar
  const [arrastre, setArrastre] = useState(null); // fantasma mientras se arrastra desde el catálogo
  const [moviendo, setMoviendo] = useState(null); // uid del adorno colocado que se está moviendo
  const [modal, setModal] = useState(null); // 'terminar' | 'confirmado' | 'volver'
  const [aviso, setAviso] = useState(null);

  const escenarioRef = useRef(null);
  const siguienteUid = useRef(1);
  const colocadosRef = useRef(colocados);
  colocadosRef.current = colocados;

  // Aviso temporal (toast).
  useEffect(() => {
    if (!aviso) return undefined;
    const t = setTimeout(() => setAviso(null), 2200);
    return () => clearTimeout(t);
  }, [aviso]);

  const aPorcentaje = useCallback((clientX, clientY) => {
    const r = escenarioRef.current.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * 100;
    const y = ((clientY - r.top) / r.height) * 100;
    return { x, y, dentro: x >= 0 && x <= 100 && y >= 0 && y <= 100 };
  }, []);

  // Escucha movimiento/soltar en window para que el arrastre siga aunque el dedo salga del elemento.
  const seguirPuntero = (onMover, onSoltar) => {
    const mover = (ev) => onMover(ev);
    const soltar = (ev) => {
      window.removeEventListener('pointermove', mover);
      window.removeEventListener('pointerup', soltar);
      window.removeEventListener('pointercancel', soltar);
      onSoltar(ev);
    };
    window.addEventListener('pointermove', mover);
    window.addEventListener('pointerup', soltar);
    window.addEventListener('pointercancel', soltar);
  };

  const agregar = (adorno, x, y) => {
    if (colocadosRef.current.length >= MAX_ADORNOS) {
      setAviso(`Máximo ${MAX_ADORNOS} adornos por diseño`);
      return;
    }
    const uid = siguienteUid.current++;
    setColocados((cs) => [...cs, { uid, adornoId: adorno.id, x: limitar(x), y: limitar(y) }]);
    setSeleccionado(uid);
    setCatalogoSel(null);
  };

  // US3.1 + US3.2: tocar selecciona el adorno; arrastrarlo al escenario lo coloca.
  const alPresionarCatalogo = (adorno, e) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    setCatalogoSel(adorno.id);
    setSeleccionado(null);
    const inicio = { x: e.clientX, y: e.clientY };
    let activo = false;
    seguirPuntero(
      (ev) => {
        if (!activo && Math.hypot(ev.clientX - inicio.x, ev.clientY - inicio.y) < UMBRAL_ARRASTRE) return;
        activo = true;
        const p = aPorcentaje(ev.clientX, ev.clientY);
        setArrastre({ adorno, cx: ev.clientX, cy: ev.clientY, sobre: p.dentro, x: p.x, y: p.y });
      },
      (ev) => {
        setArrastre(null);
        if (!activo || ev.type === 'pointercancel') return;
        const p = aPorcentaje(ev.clientX, ev.clientY);
        if (p.dentro) agregar(adorno, p.x, p.y);
        else setAviso(`Suelta el adorno sobre ${espacio.articulo.split(' ')[0]} ${espacio.nombre.toLowerCase()}`);
      }
    );
  };

  // US3.3: seleccionar un adorno colocado y moverlo arrastrando.
  const empezarAMover = (uid, e) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    setSeleccionado(uid);
    setCatalogoSel(null);
    const item = colocadosRef.current.find((c) => c.uid === uid);
    const p0 = aPorcentaje(e.clientX, e.clientY);
    const dx = p0.x - item.x;
    const dy = p0.y - item.y;
    setMoviendo(uid);
    seguirPuntero(
      (ev) => {
        const p = aPorcentaje(ev.clientX, ev.clientY);
        setColocados((cs) => cs.map((c) => (c.uid === uid ? { ...c, x: limitar(p.x - dx), y: limitar(p.y - dy) } : c)));
      },
      () => setMoviendo(null)
    );
  };

  const eliminar = (uid) => {
    setColocados((cs) => cs.filter((c) => c.uid !== uid));
    setSeleccionado(null);
    setAviso('Adorno eliminado');
  };

  // US3.4: confirmar los cambios cierra la edición y actualiza la vista del diseño.
  const confirmarCambios = () => {
    setSeleccionado(null);
    setAviso('✓ Cambios aplicados');
  };

  // Tocar el fondo del escenario: coloca el adorno elegido o confirma la edición actual.
  const alPresionarEscenario = (e) => {
    if (catalogoSel) {
      const p = aPorcentaje(e.clientX, e.clientY);
      agregar(buscarAdorno(espacioId, catalogoSel), p.x, p.y);
    } else if (seleccionado) {
      confirmarCambios();
    }
  };

  const alTeclear = (uid, e) => {
    const pasos = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      eliminar(uid);
    } else if (e.key === 'Enter' || e.key === 'Escape') {
      confirmarCambios();
    } else if (pasos[e.key]) {
      e.preventDefault();
      const [dx, dy] = pasos[e.key];
      setColocados((cs) => cs.map((c) => (c.uid === uid ? { ...c, x: limitar(c.x + dx), y: limitar(c.y + dy) } : c)));
    }
  };

  const volver = () => (colocados.length ? setModal('volver') : onVolver());
  const terminar = () => {
    setSeleccionado(null);
    setCatalogoSel(null);
    setModal('terminar');
  };

  const adornoCatalogo = catalogoSel && buscarAdorno(espacioId, catalogoSel);

  return (
    <div className="decorar">
      <header className="barra">
        <button type="button" className="barra__volver" onClick={volver} aria-label="Volver a elegir espacio" title="Volver a elegir espacio">
          ←
        </button>
        <h1 className="barra__titulo">Decorando: {espacio.titulo}</h1>
        <span className="pildora" data-contador>
          Adornos: {colocados.length}/{MAX_ADORNOS}
        </span>
        <button type="button" className="boton boton--primario boton--barra barra__derecha" onClick={terminar}>
          Terminar ✓
        </button>
      </header>

      <div className="decorar__cuerpo">
        <section className="zona-escenario">
          <div
            ref={escenarioRef}
            className={`escenario${catalogoSel ? ' escenario--colocando' : ''}`}
            data-espacio={espacio.id}
            onPointerDown={alPresionarEscenario}
          >
            <Escena espacio={espacio.id} className="escenario__fondo" />

            {colocados.map((c) => {
              const a = buscarAdorno(espacioId, c.adornoId);
              const activo = seleccionado === c.uid;
              return (
                <div
                  key={c.uid}
                  className={`colocado${activo ? ' colocado--activo' : ''}${moviendo === c.uid ? ' colocado--moviendo' : ''}`}
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                  onPointerDown={(e) => empezarAMover(c.uid, e)}
                  onKeyDown={(e) => alTeclear(c.uid, e)}
                  onFocus={() => setSeleccionado(c.uid)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${a.nombre} colocado`}
                  data-colocado={a.id}
                >
                  <img src={a.imagen} alt="" draggable="false" />
                  {activo && moviendo !== c.uid && (
                    <div className="herramientas" onPointerDown={(e) => e.stopPropagation()}>
                      <button type="button" onPointerDown={(e) => empezarAMover(c.uid, e)} title="Arrastra para mover">
                        ✥ Mover
                      </button>
                      <span className="herramientas__sep" />
                      <button type="button" className="herramientas__eliminar" onClick={() => eliminar(c.uid)}>
                        🗑️ Eliminar
                      </button>
                      <span className="herramientas__sep" />
                      <button type="button" className="herramientas__listo" onClick={confirmarCambios}>
                        ✓ Listo
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {arrastre?.sobre && (
              <div className="zona-soltar" style={{ left: `${arrastre.x}%`, top: `${arrastre.y}%` }}>
                ¡Suelta aquí!
              </div>
            )}
          </div>

          <p className="pista-escenario">
            {adornoCatalogo
              ? `✨ Arrastra «${adornoCatalogo.nombre}» o toca ${espacio.articulo.split(' ')[0]} ${espacio.nombre.toLowerCase()} para colocarlo`
              : colocados.length
                ? '👆 Toca un adorno para moverlo o eliminarlo'
                : '✨ Selecciona y arrastra un adorno desde el catálogo 👉'}
          </p>
        </section>

        <Catalogo
          espacio={espacio}
          adornos={adornos}
          seleccionadoId={catalogoSel}
          onPointerDownAdorno={alPresionarCatalogo}
        />
      </div>

      {arrastre && (
        <div className="fantasma" style={{ left: arrastre.cx, top: arrastre.cy }} aria-hidden="true">
          <img src={arrastre.adorno.imagen} alt="" />
          <span>{arrastre.adorno.nombre}</span>
        </div>
      )}

      {aviso && (
        <div className="toast" role="status">
          {aviso}
        </div>
      )}

      {/* US3.5: pantalla para confirmar el diseño o seguir editando (no se pierde nada). */}
      {modal === 'terminar' && (
        <Modal
          titulo="¿Confirmar diseño final?"
          onCerrar={() => setModal(null)}
          icono={<span className="modal__check">✓</span>}
          acciones={
            <>
              <button type="button" className="boton boton--secundario" onClick={() => setModal(null)}>
                Seguir editando
              </button>
              <button type="button" className="boton boton--primario" onClick={() => setModal('confirmado')}>
                Confirmar diseño ✨
              </button>
            </>
          }
        >
          Has decorado tu {nombreLargo} con {plural(colocados.length)}. ¿Deseas guardar tu creación o seguir editando?
        </Modal>
      )}

      {modal === 'confirmado' && (
        <Modal
          titulo="¡Diseño confirmado!"
          onCerrar={() => setModal(null)}
          icono={<span className="modal__check">🎉</span>}
          acciones={
            <>
              <button type="button" className="boton boton--secundario" onClick={() => setModal(null)}>
                Seguir editando
              </button>
              <button type="button" className="boton boton--primario" onClick={onVolver}>
                Elegir otro espacio
              </button>
            </>
          }
        >
          Tu {nombreLargo} quedó decorado con {plural(colocados.length)}.
        </Modal>
      )}

      {modal === 'volver' && (
        <Modal
          titulo="¿Elegir otro espacio?"
          onCerrar={() => setModal(null)}
          icono={<span className="modal__check modal__check--alerta">!</span>}
          acciones={
            <>
              <button type="button" className="boton boton--secundario" onClick={() => setModal(null)}>
                Seguir editando
              </button>
              <button type="button" className="boton boton--peligro" onClick={onVolver}>
                Sí, cambiar espacio
              </button>
            </>
          }
        >
          Se quitarán los {plural(colocados.length)} que colocaste en {espacio.articulo}.
        </Modal>
      )}
    </div>
  );
}
