import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Boton from '../../../Components/Boton';

const Busqueda = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtros, setFiltros] = useState({
    categoria: '',
    precioMin: '',
    precioMax: '',
    ordenarPor: 'nombre'
  });

  useEffect(() => {
    // Cargar productos y categorías desde localStorage
    const productosGuardados = JSON.parse(localStorage.getItem('productos') || '[]');
    const categoriasGuardadas = JSON.parse(localStorage.getItem('categorias') || '[]');
    
    setProductos(productosGuardados);
    setCategorias(categoriasGuardadas);
  }, []);

  useEffect(() => {
    const query = searchParams.get('q')?.toLowerCase() || '';
    
    let filtrados = productos.filter(producto => 
      producto.nombre.toLowerCase().includes(query) ||
      (producto.descripcion && producto.descripcion.toLowerCase().includes(query))
    );

    // Aplicar filtros
    if (filtros.categoria) {
      filtrados = filtrados.filter(p => p.categoria === filtros.categoria);
    }
    if (filtros.precioMin) {
      filtrados = filtrados.filter(p => parseFloat(p.precio) >= parseFloat(filtros.precioMin));
    }
    if (filtros.precioMax) {
      filtrados = filtrados.filter(p => parseFloat(p.precio) <= parseFloat(filtros.precioMax));
    }

    // Ordenar resultados
    filtrados.sort((a, b) => {
      switch (filtros.ordenarPor) {
        case 'precio-asc':
          return parseFloat(a.precio) - parseFloat(b.precio);
        case 'precio-desc':
          return parseFloat(b.precio) - parseFloat(a.precio);
        case 'nombre':
        default:
          return a.nombre.localeCompare(b.nombre);
      }
    });

    setProductosFiltrados(filtrados);
  }, [searchParams, productos, filtros]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Resultados de búsqueda: {searchParams.get('q')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filtros */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Filtros</h2>
          
          {/* Filtro por categoría */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              name="categoria"
              value={filtros.categoria}
              onChange={handleFiltroChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Todas las categorías</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Filtro por precio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rango de Precio
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="precioMin"
                value={filtros.precioMin}
                onChange={handleFiltroChange}
                placeholder="Mín"
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="precioMax"
                value={filtros.precioMax}
                onChange={handleFiltroChange}
                placeholder="Máx"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Ordenar por */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select
              name="ordenarPor"
              value={filtros.ordenarPor}
              onChange={handleFiltroChange}
              className="w-full p-2 border rounded"
            >
              <option value="nombre">Nombre</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="md:col-span-3">
          {productosFiltrados.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No se encontraron productos que coincidan con tu búsqueda.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productosFiltrados.map((producto) => (
                <div key={producto.id} className="bg-white rounded shadow p-4">
                  <img
                    src={producto.imagen || 'https://via.placeholder.com/200'}
                    alt={producto.nombre}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h3 className="font-semibold mb-2">{producto.nombre}</h3>
                  {producto.categoria && (
                    <div className="text-sm text-gray-500 mb-2">{producto.categoria}</div>
                  )}
                  <div className="text-[#FE624C] font-bold mb-4">S/ {producto.precio}</div>
                  <Boton onClick={() => navigate(`/detalle-producto/${producto.id}`)}>
                    Ver Detalle
                  </Boton>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Busqueda; 