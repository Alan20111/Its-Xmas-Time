import { useEffect } from 'react';

// Modal reutilizable (componente "Modal" del diseño).
export default function Modal({ icono, titulo, children, acciones, onCerrar, etiqueta }) {
  useEffect(() => {
    const alPresionar = (e) => e.key === 'Escape' && onCerrar?.();
    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  }, [onCerrar]);

  return (
    <div className="modal-fondo" onPointerDown={(e) => e.target === e.currentTarget && onCerrar?.()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={etiqueta || titulo}>
        {icono && <div className="modal__icono">{icono}</div>}
        <h2 className="modal__titulo">{titulo}</h2>
        <div className="modal__texto">{children}</div>
        <div className="modal__acciones">{acciones}</div>
      </div>
    </div>
  );
}
