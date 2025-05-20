import React, { useState } from 'react';
import Carrito from './Carrito';
import Navbar from '../Inicio/Navbar';
import './Checkout.css';
import Boton from '../../../Components/Boton';


const Checkout = () => {
  const [total, setTotal] = useState(0); // Estado para almacenar el total del carrito

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Navbar */}
      <Navbar />
      {/* Sección principal */}
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sección izquierda: Productos */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <Carrito actualizarTotal={setTotal} />
        </div>

        {/* Sección derecha: Resumen del carrito */}
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Resumen del Carrito</h2>
          <p className="text-gray-600">Total: S/ {total}</p>
          <Boton
            texto="Proceder al Pago"
            onClick={() => alert('Redirigiendo a la pasarela de pago...')} 
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;