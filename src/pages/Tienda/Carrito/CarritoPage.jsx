import React, { useState } from 'react';
import Carrito from './Carrito';
import './CarritoPage.css';
import Boton from '../../../Components/Boton';
import { useNavigate } from 'react-router-dom';

const CarritoPage = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0); // Estado para almacenar el total del carrito
  const [totalProductos, setTotalProductos] = useState(0); // Estado para almacenar el total de productos
  const [totalDescuento, setTotalDescuento] = useState(0); // Estado para almacenar el total de descuento

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>

        {/* Contenedor principal en fila siempre */}
        <div className="flex flex-row items-start gap-6">
          {/* Sección izquierda: Productos */}
          <div className="w-3/5">
            <div className="bg-white shadow-md rounded-lg p-4">
              <Carrito 
                actualizarTotal={setTotal} 
                actualizarTotalProductos={setTotalProductos}
                actualizarTotalDescuento={setTotalDescuento}
              />
            </div>
          </div>

          {/* Sección derecha: Resumen del carrito */}
          <div className="w-2/5">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Resumen de la compra</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Productos ({totalProductos})</span>
                  <span>S/. {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Descuento</span>
                  <span className="text-red-500 font-bold">-S/ {totalDescuento.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-500 font-bold">GRATIS</span>
                </div>
                <hr className="my-4 border-gray-300" />
                <div className="flex justify-between text-gray-800 font-semibold text-xl">
                  <span>Total</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
                <div className="mt-6">
                  <Boton
                    texto="Proceder al Pago"
                    onClick={() => navigate('/checkout')} 
                    className="w-full py-3 text-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CarritoPage;
