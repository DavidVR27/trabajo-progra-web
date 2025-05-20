import React, { useState } from 'react';
import Carrito from './Carrito';
import Navbar from '../Inicio/Navbar';
import './Checkout.css';
import Boton from '../../../Components/Boton';


const Checkout = () => {
    const [total, setTotal] = useState(0); // Estado para almacenar el total del carrito
  const [totalProductos, setTotalProductos] = useState(0); // Estado para almacenar el total de productos
  const [totalDescuento, setTotalDescuento] = useState(0); // Estado para almacenar el total de descuento


  return (
    <div className="bg-gray-100 min-h-screen p-6">
    {/* Navbar */}
      <Navbar />
      {/* Sección principal */}
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sección izquierda: Productos */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-col">
            <Carrito 
              actualizarTotal={setTotal} 
              actualizarTotalProductos={setTotalProductos}
              actualizarTotalDescuento={setTotalDescuento}
            />
          </div>
        </div>

        {/* Sección derecha: Resumen del carrito */}
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Resumen de la compra</h2>
          <div className="flex justify-between mb-2">
            <span>Productos ({totalProductos})</span>
            <span>S/. {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Descuento</span>
            <span><span className="text-red-500 font-bold">-S/ {totalDescuento.toFixed(2)}</span></span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <span><span className="text-green-500 font-bold">GRATIS</span></span>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="flex justify-between text-gray-600 font-semibold text-xl mb-6">
            <span>Total</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
          <Boton
            texto="Proceder al Pago"
            onClick={() => alert('Redirigiendo a la pasarela de pago...')} 
            className="w-full py-3 text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;