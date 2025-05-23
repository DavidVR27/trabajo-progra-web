import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const DetalleOrden = () => {
  const { id } = useParams();
  const [orden, setOrden] = useState(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
    const ordenEncontrada = ordenes.find((o, idx) => idx.toString() === id);
    setOrden(ordenEncontrada);
  }, [id]);

  useEffect(() => {
    const cats = JSON.parse(localStorage.getItem('categorias')) || [];
    setCategorias(cats);
  }, []);

  if (!orden) {
    return <div className="container mx-auto px-4 py-8 text-center">Orden no encontrada.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Detalle de Orden</h1>
      <div className="bg-white rounded shadow p-6 mb-6">
        <div><span className="font-semibold">Fecha:</span> {new Date(orden.fecha).toLocaleString()}</div>
        <div><span className="font-semibold">Nombre:</span> {orden.nombre} {orden.apellidos}</div>
        <div><span className="font-semibold">Dirección:</span> {orden.direccion}, {orden.ciudad}</div>
        <div><span className="font-semibold">Método de pago:</span> {orden.metodoPago}</div>
        <div><span className="font-semibold">Método de envío:</span> {orden.metodoEnvio}</div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Productos</h2>
      <ul className="mb-4">
        {orden.resumenCompra.productos.map((prod, idx) => (
          <li key={idx} className="mb-1">
            {prod.nombre} x{prod.cantidad} - S/ {prod.precio}
          </li>
        ))}
      </ul>
      <div className="font-bold mb-2">Total: S/ {orden.resumenCompra.total.toFixed(2)}</div>
      <Link to="/historial-pedidos" className="text-blue-600 hover:underline">Volver al historial</Link>
    </div>
  );
};

export default DetalleOrden; 