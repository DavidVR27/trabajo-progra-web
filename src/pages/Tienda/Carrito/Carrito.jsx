import React, { useState, useEffect } from 'react';
import Boton from '../../../Components/Boton';

const CARRITO_KEY = 'carrito';
const GUARDADOS_KEY = 'guardados';

const Carrito = ({ actualizarTotal, actualizarTotalProductos, actualizarTotalDescuento, actualizarCantidadItems }) => {
  // Leer productos del carrito y guardados desde localStorage
  const [productos, setProductos] = useState(() => {
    const guardados = JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
    return guardados.map(producto => ({
      ...producto,
      checked: producto.checked !== undefined ? producto.checked : true,
      precioConDescuento: producto.descuento ? producto.precio * (1 - producto.descuento) : producto.precio
    }));
  });
  const [guardados, setGuardados] = useState(() => {
    const guardados = JSON.parse(localStorage.getItem(GUARDADOS_KEY)) || [];
    return guardados;
  });

  // Guardar productos y guardados en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(productos));
  }, [productos]);
  useEffect(() => {
    localStorage.setItem(GUARDADOS_KEY, JSON.stringify(guardados));
  }, [guardados]);

  // Calcular totales
  const total = productos.reduce(
    (acc, producto) => acc + (producto.checked ? producto.precioConDescuento * producto.cantidad : 0),
    0
  );
  const totalProductos = productos.reduce(
    (acc, producto) => acc + (producto.checked ? producto.cantidad : 0),
    0
  );
  const totalDescuento = productos.reduce(
    (acc, producto) => acc + (producto.checked ? (producto.precio - producto.precioConDescuento) * producto.cantidad : 0),
    0
  );

  useEffect(() => {
    actualizarTotal && actualizarTotal(total);
    actualizarTotalProductos && actualizarTotalProductos(totalProductos);
    actualizarTotalDescuento && actualizarTotalDescuento(totalDescuento);
    actualizarCantidadItems && actualizarCantidadItems(productos.filter(producto => producto.checked).length);
  }, [total, totalProductos, totalDescuento, productos, actualizarTotal, actualizarTotalProductos, actualizarTotalDescuento, actualizarCantidadItems]);

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

  // Guardar para después
  const moverAGuardados = (id) => {
    setProductos((prevProductos) => {
      const prod = prevProductos.find(p => p.id === id);
      if (prod) setGuardados(prev => [...prev, prod]);
      return prevProductos.filter(p => p.id !== id);
    });
  };

  // Devolver al carrito
  const devolverAlCarrito = (id) => {
    setGuardados((prevGuardados) => {
      const prod = prevGuardados.find(p => p.id === id);
      if (prod) setProductos(prev => [...prev, prod]);
      return prevGuardados.filter(p => p.id !== id);
    });
  };

  // Eliminar de guardados
  const eliminarGuardado = (id) => {
    setGuardados((prevGuardados) => prevGuardados.filter(p => p.id !== id));
  };

  return (
    <div className="flex flex-col space-y-8">
      {/* Carrito */}
      <div>
        <h2 className="text-xl font-bold mb-2">Carrito de compras</h2>
        {productos.length === 0 ? (
          <div className="text-center text-gray-500">El carrito está vacío.</div>
        ) : (
          productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white shadow-md rounded-lg p-4 flex items-start w-full mb-2"
            >
              <div className="flex items-center mr-4">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#6B6B6B] mr-2 accent-[#6B6B6B] checked:bg-[#6B6B6B] checked:border-[#6B6B6B]"
                  checked={producto.checked}
                  onChange={() => toggleCheck(producto.id)}
                />
                <img src={producto.imagen} alt={producto.nombre} className="w-24 h-24 object-cover rounded-md" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-lg font-bold">{producto.nombre}</h2>
                  <div className="text-right">
                    {producto.descuento ? (
                      <>
                        <p className="text-gray-400 line-through text-sm">S/ {Number(producto.precio).toFixed(2)}</p>
                        <div className="flex items-center justify-end gap-2">
                          <p className="text-red-500 font-bold text-xl">S/ {Number(producto.precioConDescuento).toFixed(2)}</p>
                          <p className="text-red-500 text-sm bg-red-100 px-2 py-1 rounded">-{Math.round(producto.descuento * 100)}%</p>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-600 font-bold text-xl">S/ {Number(producto.precio).toFixed(2)}</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-600">{producto.descripcion}</p>
                {producto.llegada && <p className="text-[#FE624C] font-bold">{producto.llegada}</p>}
                <div className="flex items-center mt-4 justify-end gap-2">
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
                  <Boton
                    onClick={() => moverAGuardados(producto.id)}
                    texto={"Guardar para después"}
                    className="ml-2 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white"
                  />
                  <button
                    onClick={() => eliminarProducto(producto.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Guardados para después */}
      <div>
        <h2 className="text-xl font-bold mb-2">Guardados para después</h2>
        {guardados.length === 0 ? (
          <div className="text-center text-gray-500">No hay productos guardados para después.</div>
        ) : (
          guardados.map((producto) => (
            <div
              key={producto.id}
              className="bg-gray-100 shadow rounded-lg p-4 flex items-start w-full mb-2"
            >
              <img src={producto.imagen} alt={producto.nombre} className="w-24 h-24 object-cover rounded-md mr-4" />
              <div className="flex-grow">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-lg font-bold">{producto.nombre}</h2>
                  <div className="text-right">
                    {producto.descuento ? (
                      <>
                        <p className="text-gray-400 line-through text-sm">S/ {Number(producto.precio).toFixed(2)}</p>
                        <div className="flex items-center justify-end gap-2">
                          <p className="text-red-500 font-bold text-xl">S/ {Number(producto.precioConDescuento).toFixed(2)}</p>
                          <p className="text-red-500 text-sm bg-red-100 px-2 py-1 rounded">-{Math.round(producto.descuento * 100)}%</p>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-600 font-bold text-xl">S/ {Number(producto.precio).toFixed(2)}</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-600">{producto.descripcion}</p>
                {producto.llegada && <p className="text-[#FE624C] font-bold">{producto.llegada}</p>}
                <div className="flex items-center mt-4 gap-2">
                  <Boton
                    onClick={() => devolverAlCarrito(producto.id)}
                    texto={"Regresar al carrito"}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white"
                  />
                  <button
                    onClick={() => eliminarGuardado(producto.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Carrito;