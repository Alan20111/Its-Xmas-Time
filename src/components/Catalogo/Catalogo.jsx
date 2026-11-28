import { useState } from 'react';
import { CATEGORIAS } from '../../data/adornos.js';
import { filtrarCatalogo } from './busqueda.js';

// Panel lateral con el catálogo del espacio (frame 04_Catalogo).
// Los adornos se arrastran con Pointer Events (mouse y dedo) desde aquí.
export default function Catalogo({ espacio, adornos, seleccionadoId, onPointerDownAdorno }) {
  const categorias = CATEGORIAS.filter((c) => adornos.some((a) => a.categoria === c));
  // US2: búsqueda y categoría solo filtran lo que se ve en el catálogo;
  // los adornos colocados viven en Escenario y no se tocan.
  const [texto, setTexto] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const visibles = filtrarCatalogo(adornos, categoria, texto);
  const hayTexto = texto.trim() !== '';

  return (
    <aside className="catalogo" aria-label={`Adornos para ${espacio.nombre}`}>
      <div className="catalogo__encabezado">
        <h2 className="catalogo__titulo">Adornos para {espacio.nombre}</h2>
        <span className="pildora pildora--verde pildora--chica">{espacio.nombre}</span>
      </div>

      <div className="buscador">
        <span className="buscador__icono" aria-hidden="true">🔍</span>
        <input
          type="search"
          className="buscador__campo"
          placeholder="Buscar adorno por nombre…"
          aria-label="Buscar adorno por nombre"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          autoComplete="off"
          enterKeyHint="search"
        />
        {texto && (
          <button type="button" className="buscador__borrar" onClick={() => setTexto('')} aria-label="Borrar búsqueda">
            ✕
          </button>
        )}
      </div>

      <div className="catalogo__chips" role="group" aria-label="Filtrar por categoría">
        {['Todos', ...categorias].map((c) => {
          const activo = categoria === c;
          return (
            <button
              key={c}
              type="button"
              className={`chip${activo ? ' chip--activo' : ''}`}
              aria-pressed={activo}
              onClick={() => setCategoria(c)}
              data-categoria={c}
            >
              {c === 'Todos' ? `Todos (${adornos.length})` : c}
            </button>
          );
        })}
      </div>

      <p className="catalogo__contador" aria-live="polite" data-contador-catalogo>
        {visibles.length} adorno{visibles.length === 1 ? '' : 's'}
      </p>

      {visibles.length === 0 ? (
        <div className="sin-resultados">
          <span className="sin-resultados__icono" aria-hidden="true">🔎</span>
          <strong>Sin resultados</strong>
          <span>
            No hay adornos que coincidan con «{texto.trim()}»
            {categoria !== 'Todos' && <> en {categoria}</>}
          </span>
          {hayTexto && (
            <button type="button" className="boton boton--secundario boton--chico" onClick={() => setTexto('')}>
              Limpiar búsqueda
            </button>
          )}
          {categoria !== 'Todos' && (
            <button type="button" className="enlace" onClick={() => setCategoria('Todos')}>
              Ver todas las categorías
            </button>
          )}
        </div>
      ) : (
        <ul className="catalogo__rejilla">
          {visibles.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                className={`item-adorno${seleccionadoId === a.id ? ' item-adorno--seleccionado' : ''}`}
                onPointerDown={(e) => onPointerDownAdorno(a, e)}
                data-adorno={a.id}
                aria-pressed={seleccionadoId === a.id}
              >
                <img src={a.imagen} alt="" draggable="false" />
                <span>{a.nombre}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="catalogo__pista">👆 Arrastra un adorno y suéltalo sobre {espacio.articulo.split(' ')[0]} {espacio.nombre.toLowerCase()}</p>
    </aside>
  );
}
