import React, { useState, useEffect } from 'react';
import productosData from '../../../../public/productos.json'; // Importamos el JSON
import Boton from '../../../Components/Boton';

const Carrito = ({ actualizarTotal, actualizarTotalProductos }) => {
  const [productos, setProductos] = useState(
    productosData.productos.map((producto) => ({ 
      ...producto, 
      cantidad: producto.cantidad || 1, 
      checked: true 
    }))
  );

  // Calcular el total del carrito
  const total = productos.reduce(
    (acc, producto) => acc + (producto.checked ? producto.precio * producto.cantidad : 0),
    0
  );

  // Calcular el total de productos seleccionados
  const totalProductos = productos.reduce(
    (acc, producto) => acc + (producto.checked ? producto.cantidad : 0),
    0
  );

  // Actualizar el total y el total de productos en el componente padre (Checkout.jsx)
  useEffect(() => {
    actualizarTotal(total);
    actualizarTotalProductos(totalProductos);
  }, [total, totalProductos, actualizarTotal, actualizarTotalProductos]);

  const toggleCheck = (id) => {
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === id
          ? { ...producto, checked: !producto.checked }
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
        producto.id === id && producto.cantidad > 1 && producto.checked
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
    );
  };

  const eliminarProducto = (id) => {
    setProductos((prevProductos) =>
      prevProductos.filter((producto) => producto.id !== id)
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="bg-white shadow-md rounded-lg p-4 flex items-start w-full"
        >
          <div className="flex items-center mr-4">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-green-500 mr-2"
              checked={producto.checked}
              onChange={() => toggleCheck(producto.id)}
            />
            <img src={producto.imagen} alt={producto.nombre} className="w-24 h-24 object-cover rounded-md" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-lg font-bold">{producto.nombre}</h2>
              <p className="text-gray-600 font-bold text-xl">S/ {producto.precio}</p>
            </div>
            <p className="text-gray-600">{producto.descripcion}</p>
            <p className="text-[#FE624C] font-bold">{producto.llegada}</p>
            <div className="flex items-center mt-4 justify-end">
              <div className="flex items-center">
                <span className="mr-4">Cantidad</span>
                <Boton
                  onClick={() => disminuirCantidad(producto.id)}
                  disabled={!producto.checked || producto.cantidad <= 1}
                  texto={"-"}
                  className="px-3 py-1 mr-2"
                />
                <span className="mx-3">{producto.cantidad}</span>
                <Boton 
                  onClick={() => incrementarCantidad(producto.id)}
                  disabled={!producto.checked}
                  texto={"+"}
                  className="px-3 py-1 ml-2"
                />
              </div>
              <button
                onClick={() => eliminarProducto(producto.id)}
                className="text-red-500 hover:text-red-700 ml-6"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carrito;