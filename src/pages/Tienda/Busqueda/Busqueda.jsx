import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Datos simulados
const categorias = ['Alimentos', 'Bebidas', 'Limpieza'];
const productos = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  nombre: `Producto ${i + 1}`,
  categoria: categorias[i % categorias.length],
  precio: (10 + i * 2).toFixed(2),
  imagen: 'https://via.placeholder.com/100',
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Busqueda = () => {
  const query = useQuery();
  const [termino, setTermino] = useState(query.get('q') || localStorage.getItem('busqueda') || '');
  const [orden, setOrden] = useState(localStorage.getItem('orden') || 'nombre');
  const [categoria, setCategoria] = useState(localStorage.getItem('categoria') || '');
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    // Guardar filtros en localStorage
    localStorage.setItem('busqueda', termino);
    localStorage.setItem('orden', orden);
    localStorage.setItem('categoria', categoria);
  }, [termino, orden, categoria]);

  useEffect(() => {
    let filtrados = productos.filter(p =>
      (!termino || p.nombre.toLowerCase().includes(termino.toLowerCase())) &&
      (!categoria || p.categoria === categoria)
    );
    if (orden === 'precio') {
      filtrados = filtrados.sort((a, b) => a.precio - b.precio);
    } else {
      filtrados = filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    setResultados(filtrados);
  }, [termino, orden, categoria]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Resultados de búsqueda</h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <input
          type="text"
          value={termino}
          onChange={e => setTermino(e.target.value)}
          placeholder="Buscar productos..."
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />
        <select value={orden} onChange={e => setOrden(e.target.value)} className="p-2 border rounded">
          <option value="nombre">Ordenar por nombre</option>
          <option value="precio">Ordenar por precio</option>
        </select>
        <select value={categoria} onChange={e => setCategoria(e.target.value)} className="p-2 border rounded">
          <option value="">Todas las categorías</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {resultados.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No se encontraron productos.</div>
        ) : (
          resultados.map(prod => (
            <div key={prod.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
              <img src={prod.imagen} alt={prod.nombre} className="w-20 h-20 object-cover mb-2" />
              <div className="font-semibold">{prod.nombre}</div>
              <div className="text-[#FE624C] font-bold">S/ {prod.precio}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Busqueda; 