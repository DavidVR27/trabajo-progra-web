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
  const [carritoVacio, setCarritoVacio] = useState(true);

  useEffect(() => {
    // Cargar productos reales de localStorage
    const productosGuardados = JSON.parse(localStorage.getItem('productos') || '[]');
    if (productosGuardados.length > 0) {
      setProductosMasVendidos(productosGuardados.slice(0, 12));
      setProductosNuevos(productosGuardados.slice(-6));
    }
  }, []);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    setCarritoVacio(!carrito || carrito.length === 0);
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim() !== '') {
      navigate(`/busqueda?q=${encodeURIComponent(busqueda)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Banner publicitario */}
        <div className="mb-8">
          <img src="/src/Banner.webp" alt="Banner" className="w-full rounded-lg shadow" />
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-8">
          <form onSubmit={handleBuscar} className="flex gap-2">
            <input
              type="text"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Buscar productos..."
            />
            <Boton type="submit">Buscar</Boton>
          </form>
        </div>

        {/* Categorías destacadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Categorías Destacadas</h2>
            <ul className="space-y-2">
              <li><Link to="/categoria/Alimentos" className="text-[#FE624C] hover:underline">Alimentos</Link></li>
              <li><Link to="/categoria/Bebidas" className="text-[#FE624C] hover:underline">Bebidas</Link></li>
              <li><Link to="/categoria/Limpieza" className="text-[#FE624C] hover:underline">Limpieza</Link></li>
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
              <div className="flex gap-2">
                <Link to="/carritopage"><Boton texto="Ir al Carrito" className="" /></Link>
                <Link to="/productos"><Boton texto="Ver Productos" className="" /></Link>
              </div>
              {carritoVacio && (
                <div className="text-red-500 text-sm mt-2">El carrito está vacío.</div>
              )}
            </div>
          </div>
        </div>

        {/* Productos más vendidos */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Productos Más Vendidos</h2>
          {productosMasVendidos.length === 0 ? (
            <div className="text-center text-gray-500">No hay productos disponibles.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {productosMasVendidos.map((prod) => (
                <div key={prod.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
                  <img src={prod.imagen || 'https://via.placeholder.com/100'} alt={prod.nombre} className="w-20 h-20 object-cover mb-2" />
                  <div className="font-semibold">{prod.nombre}</div>
                  {prod.categoria && <div className="text-xs text-gray-500 mb-1">{prod.categoria}</div>}
                  <div className="text-[#FE624C] font-bold">S/ {prod.precio}</div>
                  <Link to={`/detalle-producto/${prod.id}`} className="mt-2 text-sm text-blue-600 hover:underline">Ver detalle</Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Productos nuevos */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Productos Nuevos</h2>
          {productosNuevos.length === 0 ? (
            <div className="text-center text-gray-500">No hay productos nuevos disponibles.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {productosNuevos.map((prod) => (
                <div key={prod.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
                  <img src={prod.imagen || 'https://via.placeholder.com/100'} alt={prod.nombre} className="w-20 h-20 object-cover mb-2" />
                  <div className="font-semibold">{prod.nombre}</div>
                  {prod.categoria && <div className="text-xs text-gray-500 mb-1">{prod.categoria}</div>}
                  <div className="text-[#FE624C] font-bold">S/ {prod.precio}</div>
                  <Link to={`/detalle-producto/${prod.id}`} className="mt-2 text-sm text-blue-600 hover:underline">Ver detalle</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Footer e-commerce */}
      <footer className="bg-[#22223B] text-white mt-12 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Trabajo Progra Web grupo03</h3>
            <p className="text-gray-300">&copy; {new Date().getFullYear()} </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#FE624C] transition-colors">Inicio</a>
            <a href="#" className="hover:text-[#FE624C] transition-colors">Productos</a>
            <a href="#" className="hover:text-[#FE624C] transition-colors">Categorías</a>
            <a href="#" className="hover:text-[#FE624C] transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
