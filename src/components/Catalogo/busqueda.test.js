import { describe, expect, it } from 'vitest';
import { buscarAdornos, filtrarCatalogo, filtrarPorCategoria, normalizar } from './busqueda.js';
import { ADORNOS } from '../../data/adornos.js';

const nombres = (lista) => lista.map((a) => a.nombre);

describe('US2 – búsqueda de adornos por nombre', () => {
  it('normaliza mayúsculas, acentos y espacios', () => {
    expect(normalizar('  MUÑECO de Nieve ')).toBe('muneco de nieve');
  });

  it('texto vacío regresa todo el catálogo', () => {
    expect(buscarAdornos(ADORNOS.arbol, '   ')).toHaveLength(ADORNOS.arbol.length);
  });

  it('"esfera" muestra solo esferas', () => {
    const r = buscarAdornos(ADORNOS.arbol, 'esfera');
    expect(nombres(r)).toEqual(['Esfera Roja', 'Esfera Dorada', 'Esfera Azul']);
  });

  it('"ESFERA" funciona igual que "esfera"', () => {
    expect(buscarAdornos(ADORNOS.arbol, 'ESFERA')).toEqual(buscarAdornos(ADORNOS.arbol, 'esfera'));
  });

  it('"munec" encuentra "Muñeco de Nieve"', () => {
    expect(nombres(buscarAdornos(ADORNOS.casa, 'munec'))).toEqual(['Muñeco de Nieve']);
  });

  it('"pino azul" no tiene resultados', () => {
    expect(buscarAdornos(ADORNOS.arbol, 'pino azul')).toEqual([]);
  });

  it('no modifica la lista original', () => {
    const copia = [...ADORNOS.arbol];
    buscarAdornos(ADORNOS.arbol, 'luces');
    expect(ADORNOS.arbol).toEqual(copia);
  });
});

describe('Filtro por categoría', () => {
  it('"Todos" regresa todo', () => {
    expect(filtrarPorCategoria(ADORNOS.arbol, 'Todos')).toHaveLength(ADORNOS.arbol.length);
  });

  it('cada categoría muestra solo sus adornos', () => {
    for (const lista of Object.values(ADORNOS)) {
      for (const c of ['Luces', 'Esferas', 'Estrellas', 'Dibujos']) {
        expect(filtrarPorCategoria(lista, c).every((a) => a.categoria === c)).toBe(true);
      }
    }
  });

  it('se combina con el buscador (primero categoría, luego texto)', () => {
    expect(nombres(filtrarCatalogo(ADORNOS.arbol, 'Esferas', 'roja'))).toEqual(['Esfera Roja']);
    expect(filtrarCatalogo(ADORNOS.arbol, 'Luces', 'esfera')).toEqual([]);
    expect(nombres(filtrarCatalogo(ADORNOS.casa, 'Dibujos', 'MUNEC'))).toEqual(['Muñeco de Nieve']);
  });
});
