import React, { useEffect, useState } from 'react';

const HistorialPedidos = () => {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    try {
      const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes') || '[]');
      console.log('Órdenes recuperadas:', ordenesGuardadas);
      setOrdenes(ordenesGuardadas);
    } catch (error) {
      console.error('Error al cargar las órdenes:', error);
      setOrdenes([]);
    }
  }, []);

  if (!ordenes || ordenes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Historial de Pedidos</h1>
        <p>No tienes pedidos registrados.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Historial de Pedidos</h1>
      <div className="space-y-6">
        {ordenes.map((orden, idx) => (
          <div key={idx} className="bg-white rounded shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-semibold">Fecha:</span> {new Date(orden.fecha).toLocaleString()}
              </div>
              <div className="font-bold text-[#FE624C]">
                Total: S/ {orden.resumenCompra?.total?.toFixed(2) || '0.00'}
              </div>
            </div>
            <ul className="mb-2">
              {orden.resumenCompra?.productos?.map((prod, i) => (
                <li key={i} className="text-gray-700">
                  {prod.nombre} x{prod.cantidad} - S/ {prod.precio}
                </li>
              ))}
            </ul>
            <div className="text-sm text-gray-500">Método de pago: {orden.metodoPago}</div>
            <div className="text-sm text-gray-500">Método de envío: {orden.metodoEnvio}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorialPedidos; 