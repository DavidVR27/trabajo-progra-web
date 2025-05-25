import React, { useState, useEffect } from 'react';
import Carrito from './Carrito';
import './CarritoPage.css';
import Boton from '../../../Components/Boton';
import { useNavigate } from 'react-router-dom';
import { carritoService } from '../../../services/carritoService';

const CarritoPage = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalDescuento, setTotalDescuento] = useState(0);
  const [cantidadItems, setCantidadItems] = useState(0);

  useEffect(() => {
    // Obtener el carrito usando el servicio
    const carrito = carritoService.obtenerCarrito();
    setCantidadItems(carrito.length);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Carrito de Compras</h1>
        <p className="text-gray-600 mb-6 text-xl">Tienes {cantidadItems} ítems</p>

        {/* Contenedor principal en fila siempre */}
        <div className="flex flex-row items-start gap-6">
          {/* Sección izquierda: Productos */}
          <div className="w-3/5">
            <div className="bg-white shadow-md rounded-lg p-4">
              <Carrito 
                actualizarTotal={setTotal} 
                actualizarTotalProductos={setTotalProductos}
                actualizarTotalDescuento={setTotalDescuento}
                actualizarCantidadItems={setCantidadItems}
              />
            </div>
          </div>

          {/* Sección derecha: Resumen del carrito */}
          <div className="w-2/5">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Resumen de la compra</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalProductos} Productos)</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Descuento</span>
                  <span className="text-red-500 font-bold">-S/ {totalDescuento.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Entrega</span>
                  <span className="text-green-500 font-bold">GRATIS</span>
                </div>
                <hr className="my-5 border-gray-200" />
                <div className="flex justify-between text-gray-800 font-semibold text-xl">
                  <span>TOTAL</span>
                  <span>S/ {(total - totalDescuento).toFixed(2)}</span>
                </div>
                <div className="mt-6">
                  <Boton
                    texto="Proceder al Pago"
                    onClick={() => navigate('/tienda/checkout/direccion')} 
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
