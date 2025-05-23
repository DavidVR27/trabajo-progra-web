import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const productos = JSON.parse(localStorage.getItem('productos') || '[]');
    const producto = productos.find(p => p.id === id);
    if (producto) {
      setNombre(producto.nombre);
      setPrecio(producto.precio);
      setCategoria(producto.categoria || '');
    }

    // Cargar categorías
    const categoriasGuardadas = JSON.parse(localStorage.getItem('categorias') || '[]');
    setCategorias(categoriasGuardadas);
  }, [id]);

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!nombre || !precio || !categoria) {
      alert('Completa todos los campos');
      return;
    }
    const productos = JSON.parse(localStorage.getItem('productos') || '[]');
    const nuevosProductos = productos.map(p =>
      p.id === id ? { ...p, nombre, precio: parseFloat(precio).toFixed(2), categoria } : p
    );
    localStorage.setItem('productos', JSON.stringify(nuevosProductos));
    alert('Producto actualizado correctamente');
    navigate('/admin/lista-producto');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Editar Producto</h1>
      <form onSubmit={handleGuardar} className="bg-white rounded shadow p-6">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Nombre del producto:</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Precio:</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Categoría:</label>
          <select
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat, index) => (
              <option key={index} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;
