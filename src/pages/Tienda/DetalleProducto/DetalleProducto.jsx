import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Boton from '../../../Components/Boton';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [productosRelacionados, setProductosRelacionados] = useState([]);

  useEffect(() => {
    // Cargar productos desde localStorage
    const productos = JSON.parse(localStorage.getItem('productos') || '[]');
    const productoEncontrado = productos.find(p => p.id === id);
    
    if (productoEncontrado) {
      setProducto(productoEncontrado);
      // Filtrar productos relacionados de la misma categoría
      const relacionados = productos
        .filter(p => p.categoria === productoEncontrado.categoria && p.id !== productoEncontrado.id)
        .slice(0, 3);
      setProductosRelacionados(relacionados);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleAgregarAlCarrito = () => {
    if (!producto) return;

    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      carrito.push({
        ...producto,
        cantidad
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    navigate('/carrito');
  };

  if (!producto) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen del producto */}
        <div className="bg-white p-4 rounded shadow">
          <img 
            src={producto.imagen || 'https://via.placeholder.com/400'} 
            alt={producto.nombre} 
            className="w-full h-auto rounded"
          />
        </div>

        {/* Información del producto */}
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-2">{producto.nombre}</h1>
          {producto.categoria && (
            <div className="text-gray-600 mb-4">Categoría: {producto.categoria}</div>
          )}
          <div className="text-[#FE624C] text-2xl font-bold mb-4">
            S/ {producto.precio}
          </div>
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Descripción:</h2>
            <p className="text-gray-600">{producto.descripcion}</p>
          </div>

          {/* Selector de cantidad */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad:
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                className="px-3 py-1 border rounded-l"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-t border-b"
              />
              <button
                onClick={() => setCantidad(cantidad + 1)}
                className="px-3 py-1 border rounded-r"
              >
                +
              </button>
            </div>
          </div>

          {/* Botón de agregar al carrito */}
          <Boton onClick={handleAgregarAlCarrito}>
            Agregar al Carrito
          </Boton>
        </div>
      </div>

      {/* Productos relacionados */}
      {productosRelacionados.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productosRelacionados.map((prod) => (
              <div key={prod.id} className="bg-white rounded shadow p-4">
                <img 
                  src={prod.imagen || 'https://via.placeholder.com/200'} 
                  alt={prod.nombre} 
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="font-semibold mb-2">{prod.nombre}</h3>
                <div className="text-[#FE624C] font-bold mb-2">S/ {prod.precio}</div>
                <Boton onClick={() => navigate(`/detalle-producto/${prod.id}`)}>
                  Ver Detalle
                </Boton>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleProducto;
