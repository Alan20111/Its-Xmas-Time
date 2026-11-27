import { useState } from 'react';
import SeleccionEspacio from './components/SeleccionEspacio.jsx';
import Escenario from './components/Escenario.jsx';

export default function App() {
  // null = pantalla de selección; 'arbol' | 'chimenea' | 'casa' = escenario cargado.
  const [espacio, setEspacio] = useState(null);

  if (!espacio) return <SeleccionEspacio onConfirmar={setEspacio} />;
  return <Escenario key={espacio} espacioId={espacio} onVolver={() => setEspacio(null)} />;
}
