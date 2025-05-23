import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Boton from '../../../Components/Boton';

// Datos simulados para productos y series
const productosMasVendidos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  nombre: `Producto ${i + 1}`,
  precio: (10 + i * 2).toFixed(2),
  imagen: 'https://via.placeholder.com/100',
  categoria: ''
}));

const seriesNuevas = [
  { id: 1, nombre: 'Serie A', descripcion: 'Nueva colección A', imagen: 'https://via.placeholder.com/150' },
  { id: 2, nombre: 'Serie B', descripcion: 'Nueva colección B', imagen: 'https://via.placeholder.com/150' },
  { id: 3, nombre: 'Serie C', descripcion: 'Nueva colección C', imagen: 'https://via.placeholder.com/150' },
];

const productosNuevos = Array.from({ length: 6 }, (_, i) => ({
  id: i + 101,
  nombre: `Nuevo Producto ${i + 1}`,
  precio: (20 + i * 3).toFixed(2),
  imagen: 'https://via.placeholder.com/100',
  categoria: ''
}));

const Inicio = () => {
  const [busqueda, setBusqueda] = useState('');
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [productosNuevos, setProductosNuevos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar productos reales de localStorage si existen
    const productosGuardados = JSON.parse(localStorage.getItem('productos') || '[]');
    if (productosGuardados.length > 0) {
      setProductosMasVendidos(productosGuardados.slice(0, 12));
      setProductosNuevos(productosGuardados.slice(-6));
    } else {
      // Datos simulados para productos y series
      setProductosMasVendidos(Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        nombre: `Producto ${i + 1}`,
        precio: (10 + i * 2).toFixed(2),
        imagen: 'https://via.placeholder.com/100',
        categoria: ''
      })));
      setProductosNuevos(Array.from({ length: 6 }, (_, i) => ({
        id: i + 101,
        nombre: `Nuevo Producto ${i + 1}`,
        precio: (20 + i * 3).toFixed(2),
        imagen: 'https://via.placeholder.com/100',
        categoria: ''
      })));
    }
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim() !== '') {
      navigate(`/busqueda?q=${encodeURIComponent(busqueda)}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner publicitario */}
      <div className="mb-8">
        <img src="/src/Banner.webp" alt="Banner" className="w-full rounded-lg shadow" />
      </div>

      {/* Barra de búsqueda */}
      <form onSubmit={handleBuscar} className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Buscar productos, series o marcas..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-l focus:outline-none"
        />
        <button type="submit" className="bg-[#FE624C] text-white px-4 rounded-r">Buscar</button>
      </form>

      {/* Categorías destacadas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Categorías Destacadas</h2>
          <ul className="space-y-2">
            <li><Link to="/categorias/alimentos" className="text-[#FE624C] hover:underline">Alimentos</Link></li>
            <li><Link to="/categorias/bebidas" className="text-[#FE624C] hover:underline">Bebidas</Link></li>
            <li><Link to="/categorias/limpieza" className="text-[#FE624C] hover:underline">Limpieza</Link></li>
          </ul>
        </div>
        {/* Ofertas especiales */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Ofertas Especiales</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium">Descuentos del día</h3>
              <p className="text-gray-600">Hasta 50% de descuento en productos seleccionados</p>
            </div>
            <div>
              <h3 className="font-medium">Envío gratis</h3>
              <p className="text-gray-600">En compras mayores a S/ 100</p>
            </div>
          </div>
        </div>
        {/* Acciones rápidas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="space-y-4">
            <Link to="/carritopage"><Boton texto="Ir al Carrito" className="w-full" /></Link>
            <Link to="/productos"><Boton texto="Ver Productos" className="w-full" /></Link>
          </div>
        </div>
      </div>

      {/* Productos más vendidos */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Los 12 más vendidos del mes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {productosMasVendidos.map((prod) => (
            <div key={prod.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
              <img src={prod.imagen} alt={prod.nombre} className="w-20 h-20 object-cover mb-2" />
              <div className="font-semibold">{prod.nombre}</div>
              {prod.categoria && <div className="text-xs text-gray-500 mb-1">{prod.categoria}</div>}
              <div className="text-[#FE624C] font-bold">S/ {prod.precio}</div>
              <Link to={`/detalle-producto/${prod.id}`} className="mt-2 text-sm text-blue-600 hover:underline">Ver detalle</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Series nuevas */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Series Nuevas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {seriesNuevas.map((serie) => (
            <div key={serie.id} className="bg-white rounded shadow p-6 flex flex-col items-center">
              <img src={serie.imagen} alt={serie.nombre} className="w-32 h-32 object-cover mb-2" />
              <div className="font-semibold text-lg">{serie.nombre}</div>
              <div className="text-gray-600 mb-2">{serie.descripcion}</div>
              <Link to="/categorias" className="text-[#FE624C] hover:underline">Ver productos</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Productos nuevos */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Productos Nuevos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {productosNuevos.map((prod) => (
            <div key={prod.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
              <img src={prod.imagen} alt={prod.nombre} className="w-20 h-20 object-cover mb-2" />
              <div className="font-semibold">{prod.nombre}</div>
              {prod.categoria && <div className="text-xs text-gray-500 mb-1">{prod.categoria}</div>}
              <div className="text-[#FE624C] font-bold">S/ {prod.precio}</div>
              <Link to={`/detalle-producto/${prod.id}`} className="mt-2 text-sm text-blue-600 hover:underline">Ver detalle</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
