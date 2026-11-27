import { useState } from 'react';
import { ESPACIOS, buscarEspacio } from '../data/espacios.js';
import { Escena } from './Ilustraciones.jsx';
import Modal from './Modal.jsx';

// US1 – Seleccionar el espacio (frames 01_Seleccion y 02_Confirmacion).
export default function SeleccionEspacio({ onConfirmar }) {
  const [pendiente, setPendiente] = useState(null);
  const espacio = pendiente && buscarEspacio(pendiente);

  return (
    <main className="seleccion">
      <p className="seleccion__marca">EQ4A • SPR1 • IT'S XMAS TIME</p>
      <h1 className="seleccion__titulo">Elige un espacio para decorar</h1>
      <p className="seleccion__subtitulo">Selecciona el escenario que deseas personalizar con adornos navideños</p>

      <div className="seleccion__tarjetas">
        {ESPACIOS.map((e) => {
          const activa = pendiente === e.id;
          return (
            <button
              key={e.id}
              type="button"
              className={`tarjeta-espacio${activa ? ' tarjeta-espacio--activa' : ''}`}
              onClick={() => setPendiente(e.id)}
              aria-pressed={activa}
              data-espacio={e.id}
            >
              <span className="tarjeta-espacio__ilustracion" style={{ background: e.fondo }}>
                <Escena espacio={e.id} decorado />
              </span>
              <span className="tarjeta-espacio__nombre">{e.nombre}</span>
              <span className="tarjeta-espacio__descripcion">{e.descripcion}</span>
              <span className={`chip-seleccion${activa ? ' chip-seleccion--activa' : ''}`}>
                {activa ? '✓ Seleccionado' : 'Seleccionar'}
              </span>
            </button>
          );
        })}
      </div>

      <p className="seleccion__pista">💡 Toca una tarjeta para ver la confirmación y empezar a decorar</p>

      {espacio && (
        <Modal
          titulo="¿Quieres decorar este espacio?"
          onCerrar={() => setPendiente(null)}
          icono={
            <span className="modal__ilustracion" style={{ background: espacio.fondo }}>
              <Escena espacio={espacio.id} decorado />
            </span>
          }
          acciones={
            <>
              <button type="button" className="boton boton--secundario" onClick={() => setPendiente(null)}>
                Cancelar
              </button>
              <button type="button" className="boton boton--primario" onClick={() => onConfirmar(espacio.id)}>
                Confirmar
              </button>
            </>
          }
        >
          Has seleccionado {espacio.articulo}. {espacio.confirmacion}
        </Modal>
      )}
    </main>
  );
}
