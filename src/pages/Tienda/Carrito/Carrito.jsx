import React, { useState, useEffect } from 'react';
import Boton from '../../../Components/Boton';
import { carritoService } from '../../../services/carritoService'; // ajusta la ruta si es necesario

const Carrito = ({ actualizarTotal, actualizarTotalProductos, actualizarTotalDescuento, actualizarCantidadItems }) => {
  const [productos, setProductos] = useState([]);
  const [guardados, setGuardados] = useState([]);

  // Cargar datos del carrito al iniciar
  useEffect(() => {
    const cargados = carritoService.obtenerCarrito();
    const formateados = cargados.map(producto => ({
      ...producto,
      checked: producto.checked !== undefined ? producto.checked : true,
      cantidad: producto.cantidad || 1,
      precio: producto.precio || 0,
      descuento: producto.descuento || 0,
      precioConDescuento: producto.descuento ? (producto.precio || 0) * (1 - producto.descuento) : (producto.precio || 0),
      imagen: producto.imagen || 'https://via.placeholder.com/100',
      nombre: producto.nombre || 'Producto sin nombre',
      descripcion: producto.descripcion || ''
    }));
    setProductos(formateados);
  }, []);

  // Actualizar carrito en localStorage solo cuando se modifica un producto específico
  const actualizarCarrito = (productoId, cambios) => {
    setProductos(prev => {
      const nuevosProductos = prev.map(p => 
        p.id === productoId ? { ...p, ...cambios } : p
      );
      carritoService.vaciarCarrito();
      nuevosProductos.forEach(prod => {
        carritoService.agregarProducto(prod, prod.cantidad);
      });
      return nuevosProductos;
    });
  };

  // Calcular totales
  const total = productos.reduce((acc, p) => acc + (p.checked ? p.precioConDescuento * p.cantidad : 0), 0);
  const totalProductos = productos.reduce((acc, p) => acc + (p.checked ? p.cantidad : 0), 0);
  const totalDescuento = productos.reduce((acc, p) => acc + (p.checked ? (p.precio - p.precioConDescuento) * p.cantidad : 0), 0);

  // Enviar totales al componente padre
  useEffect(() => {
    actualizarTotal && actualizarTotal(total);
    actualizarTotalProductos && actualizarTotalProductos(totalProductos);
    actualizarTotalDescuento && actualizarTotalDescuento(totalDescuento);
    actualizarCantidadItems && actualizarCantidadItems(productos.filter(p => p.checked).length);
  }, [total, totalProductos, totalDescuento, productos]);

  const toggleCheck = (id) => {
    actualizarCarrito(id, { checked: !productos.find(p => p.id === id).checked });
  };

  const incrementarCantidad = (id) => {
    const producto = productos.find(p => p.id === id);
    if (producto && producto.checked) {
      actualizarCarrito(id, { cantidad: producto.cantidad + 1 });
    }
  };

  const disminuirCantidad = (id) => {
    const producto = productos.find(p => p.id === id);
    if (producto && producto.checked && producto.cantidad > 1) {
      actualizarCarrito(id, { cantidad: producto.cantidad - 1 });
    }
  };

  const eliminarProducto = (id) => {
    setProductos(prev => {
      const nuevosProductos = prev.filter(p => p.id !== id);
      carritoService.vaciarCarrito();
      nuevosProductos.forEach(prod => {
        carritoService.agregarProducto(prod, prod.cantidad);
      });
      return nuevosProductos;
    });
  };

  const moverAGuardados = (id) => {
    setProductos(prev => {
      const producto = prev.find(p => p.id === id);
      if (producto) setGuardados(g => [...g, producto]);
      return prev.filter(p => p.id !== id);
    });
  };

  const devolverAlCarrito = (id) => {
    setGuardados(prev => {
      const producto = prev.find(p => p.id === id);
      if (producto) setProductos(p => [...p, producto]);
      return prev.filter(p => p.id !== id);
    });
  };

  const eliminarGuardado = (id) => {
    setGuardados(prev => prev.filter(p => p.id !== id));
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
                          <p className="text-red-500 font-bold text-xl">S/ {producto.precioConDescuento.toFixed(2)}</p>
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
                          <p className="text-red-500 font-bold text-xl">S/ {producto.precioConDescuento.toFixed(2)}</p>
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
