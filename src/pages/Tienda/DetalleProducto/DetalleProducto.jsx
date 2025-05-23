import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Boton from '../../../Components/Boton';

// Datos simulados (en el futuro se puede traer de una API o contexto)
const productos = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  nombre: `Producto ${i + 1}`,
  precio: (10 + i * 2).toFixed(2),
  descripcion: `Descripción detallada del Producto ${i + 1}. Ideal para tus necesidades diarias.`,
  imagen: 'https://via.placeholder.com/200',
}));

const DetalleProducto = () => {
  const { id } = useParams();
  const producto = productos.find(p => p.id === id);
  const [cantidad, setCantidad] = useState(1);

  const handleAgregarCarrito = () => {
    // Lógica para agregar al carrito (usando localStorage en el futuro)
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      existe.cantidad += cantidad;
    } else {
      carrito.push({ ...producto, cantidad });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');
  };

  if (!producto) {
    return <div className="text-center py-16 text-gray-500">Producto no encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <img src={producto.imagen} alt={producto.nombre} className="w-64 h-64 object-cover rounded shadow" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{producto.nombre}</h1>
          <div className="text-[#FE624C] text-2xl font-bold mb-4">S/ {producto.precio}</div>
          <p className="mb-6 text-gray-700">{producto.descripcion}</p>
          <div className="flex items-center gap-4 mb-4">
            <label htmlFor="cantidad" className="font-medium">Cantidad:</label>
            <input
              id="cantidad"
              type="number"
              min="1"
              value={cantidad}
              onChange={e => setCantidad(Number(e.target.value))}
              className="w-20 p-2 border rounded"
            />
          </div>
          <Boton texto="Agregar al carrito" onClick={handleAgregarCarrito} />
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
