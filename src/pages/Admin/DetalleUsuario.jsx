import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetalleUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const user = usuarios.find(u => u.id === id);
    setUsuario(user);
    const todasOrdenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
    const ordenesUsuario = todasOrdenes.filter(o => o.correo === user?.correo);
    setOrdenes(ordenesUsuario);
  }, [id]);

  if (!usuario) {
    return <div className="container mx-auto px-4 py-8 text-center">Usuario no encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Detalle de Usuario</h1>
      <div className="bg-white rounded shadow p-6 mb-6">
        <div><span className="font-semibold">Nombre:</span> {usuario.nombre} {usuario.apellido}</div>
        <div><span className="font-semibold">Correo:</span> {usuario.correo}</div>
        <div><span className="font-semibold">Estado:</span> {usuario.activo ? 'Activo' : 'Desactivado'}</div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Órdenes del usuario</h2>
      {ordenes.length === 0 ? (
        <div className="text-gray-500">Este usuario no tiene órdenes registradas.</div>
      ) : (
        <ul className="space-y-2">
          {ordenes.map((orden, idx) => (
            <li key={idx} className="bg-gray-100 rounded p-4">
              <div><span className="font-semibold">Fecha:</span> {new Date(orden.fecha).toLocaleString()}</div>
              <div><span className="font-semibold">Total:</span> S/ {orden.resumenCompra.total.toFixed(2)}</div>
              <div><span className="font-semibold">Productos:</span> {orden.resumenCompra.productos.map(p => `${p.nombre} x${p.cantidad}`).join(', ')}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DetalleUsuario; 