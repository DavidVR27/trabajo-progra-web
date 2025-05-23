import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ConfirmacionOrden = () => {
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    const ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
    if (ordenes.length > 0) {
      setOrden(ordenes[ordenes.length - 1]);
    }
  }, []);

  if (!orden) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">No hay orden reciente</h1>
        <Link to="/" className="text-blue-600 hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">¡Gracias por tu compra!</h1>
      <p className="mb-6">Tu pedido ha sido registrado exitosamente.</p>
      <div className="bg-white rounded shadow p-6 inline-block text-left mb-6">
        <h2 className="text-xl font-semibold mb-2">Resumen de tu orden</h2>
        <ul className="mb-2">
          {orden.resumenCompra.productos.map((prod, idx) => (
            <li key={idx} className="mb-1">
              {prod.nombre} x{prod.cantidad} - S/ {prod.precio}
            </li>
          ))}
        </ul>
        <div className="font-bold">Total: S/ {orden.resumenCompra.total.toFixed(2)}</div>
      </div>
      <Link to="/" className="inline-block mt-4 px-6 py-2 bg-[#FE624C] text-white rounded hover:bg-[#e5533d]">Volver al inicio</Link>
    </div>
  );
};

export default ConfirmacionOrden; 