import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductosTienda = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos') || '[]');
    setProductos(productosGuardados);
    // Obtener categorías únicas
    const cats = Array.from(new Set(productosGuardados.map(p => p.categoria).filter(Boolean)));
    setCategorias(cats);
  }, []);

  const agregarAlCarrito = (producto) => {
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      existe.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');
  };

  // Filtrar y ordenar productos
  let productosFiltrados = productos.filter(p =>
    (!busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase())) &&
    (!categoria || p.categoria === categoria)
  );
  if (orden === 'caro') {
    productosFiltrados = productosFiltrados.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
  } else if (orden === 'barato') {
    productosFiltrados = productosFiltrados.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Todos los Productos</h1>
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div>
          <label className="block text-sm font-semibold mb-1">Buscar por nombre:</label>
          <input
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="p-2 border rounded"
            placeholder="Nombre del producto"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Ordenar por precio:</label>
          <select value={orden} onChange={e => setOrden(e.target.value)} className="p-2 border rounded">
            <option value="">Sin orden</option>
            <option value="caro">Más caro</option>
            <option value="barato">Más barato</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Filtrar por categoría:</label>
          <select value={categoria} onChange={e => setCategoria(e.target.value)} className="p-2 border rounded">
            <option value="">Todas</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      {productosFiltrados.length === 0 ? (
        <div className="text-center text-gray-500">No hay productos registrados.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productosFiltrados.map((prod) => (
            <div key={prod.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
              <img src={prod.imagen || 'https://via.placeholder.com/100'} alt={prod.nombre} className="w-20 h-20 object-cover mb-2" />
              <div className="font-semibold">{prod.nombre}</div>
              {prod.categoria && <div className="text-xs text-gray-500 mb-1">{prod.categoria}</div>}
              <div className="text-[#FE624C] font-bold mb-2">S/ {prod.precio}</div>
              <button
                onClick={() => agregarAlCarrito(prod)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-2"
              >
                Agregar al carrito
              </button>
              <Link to={`/detalle-producto/${prod.id}`} className="text-blue-600 hover:underline text-sm">Ver detalle</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductosTienda; 