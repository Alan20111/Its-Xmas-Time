// Espacios que el usuario puede decorar (US1).
export const ESPACIOS = [
  {
    id: 'chimenea',
    nombre: 'Chimenea',
    titulo: 'Chimenea Navideña',
    emoji: '🔥',
    articulo: 'la Chimenea',
    descripcion: 'Botas, guirnaldas, luces y velas',
    confirmacion: 'Podrás agregar botas, guirnaldas, luces, velas y esferas colgantes.',
    fondo: '#FBF0E4',
  },
  {
    id: 'arbol',
    nombre: 'Árbol',
    titulo: 'Árbol de Navidad',
    emoji: '🎄',
    articulo: 'el Árbol Navideño',
    descripcion: 'Esferas, luces, estrella y colgantes',
    confirmacion: 'Podrás agregar esferas, luces, estrellas y colgantes.',
    fondo: '#EAF5EE',
  },
  {
    id: 'casa',
    nombre: 'Casa',
    titulo: 'Casa Navideña',
    emoji: '🏠',
    articulo: 'la Casa Navideña',
    descripcion: 'Luces, corona, guirnalda y muñeco',
    confirmacion: 'Podrás agregar luces, corona para la puerta, guirnaldas, muñeco de nieve y decoraciones de ventana.',
    fondo: '#E9F0F7',
  },
];

export const buscarEspacio = (id) => ESPACIOS.find((e) => e.id === id);
