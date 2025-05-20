import React, { useState, useEffect } from 'react';
import productosData from '../../../../public/productos.json'; // Importamos el JSON
import Boton from '../../../Components/Boton';

const Carrito = ({ actualizarTotal }) => {
  const [productos, setProductos] = useState(
    productosData.productos.map((producto) => ({ ...producto, cantidad: 1, checked: true }))
  );

  // Calcular el total del carrito
  const total = productos.reduce(
    (acc, producto) => acc + (producto.checked ? producto.precio * producto.cantidad : 0),
    0
  );

  // Actualizar el total en el componente padre (Checkout.jsx)
  useEffect(() => {
    actualizarTotal(total);
  }, [total, actualizarTotal]);

  const toggleCheck = (id) => {
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === id
          ? { ...producto, checked: !producto.checked, cantidad: !producto.checked ? 1 : 0 }
          : producto
      )
    );
  };

  const incrementarCantidad = (id) => {
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === id && producto.checked
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      )
    );
  };

  const disminuirCantidad = (id) => {
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === id && producto.cantidad > 0 && producto.checked
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start"
        >
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-semibold">{producto.nombre}</h2>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-green-500"
              checked={producto.checked}
              onChange={() => toggleCheck(producto.id)}
            />
          </div>
          <p className="text-gray-600">Precio: S/ {producto.precio}</p>
          <p className="text-gray-600">Cantidad: {producto.cantidad}</p>
          <div className="flex mt-4">
            <Boton
              onClick={() => disminuirCantidad(producto.id)}
              disabled={!producto.checked || producto.cantidad <= 1}
              texto={"-"}
            />
            <Boton 
              onClick={() => incrementarCantidad(producto.id)}
              disabled={!producto.checked}
              texto={"+"}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carrito;