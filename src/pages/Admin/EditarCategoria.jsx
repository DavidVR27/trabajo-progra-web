import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarCategoria = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    const categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
    const categoria = categorias.find(c => c.id === id);
    if (categoria) {
      setNombre(categoria.nombre);
      setDescripcion(categoria.descripcion);
    }
  }, [id]);

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!nombre || !descripcion) {
      alert('Completa todos los campos');
      return;
    }
    const categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
    const nuevasCategorias = categorias.map(c =>
      c.id === id ? { ...c, nombre, descripcion } : c
    );
    localStorage.setItem('categorias', JSON.stringify(nuevasCategorias));
    window.dispatchEvent(new Event('categoriasActualizadas'));
    alert('Categoría actualizada correctamente');
    navigate('/admin/lista-categorias');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Editar Categoría</h1>
      <form onSubmit={handleGuardar} className="bg-white rounded shadow p-6">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Nombre de la categoría:</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditarCategoria; 