import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ nombre: '', apellido: '', correo: '', password: '' });
  const [editando, setEditando] = useState(false);
  const [nuevoPassword, setNuevoPassword] = useState('');

  useEffect(() => {
    let usuarioGuardado = null;
    try {
      usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    } catch (e) {
      // Si el valor no es JSON válido, limpiar y redirigir
      localStorage.removeItem('usuario');
      alert('Debes iniciar sesión para ver tu perfil');
      navigate('/login');
      return;
    }
    if (!usuarioGuardado || !usuarioGuardado.correo) {
      alert('Debes iniciar sesión para ver tu perfil');
      navigate('/login');
      return;
    }
    setUsuario({
      nombre: usuarioGuardado.nombre || '',
      apellido: usuarioGuardado.apellido || '',
      correo: usuarioGuardado.correo || '',
      password: usuarioGuardado.password || ''
    });
  }, [navigate]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    // Solo se puede editar el usuario logueado
    localStorage.setItem('usuario', JSON.stringify(usuario));
    setEditando(false);
    alert('Datos actualizados correctamente');
  };

  const handleCambiarPassword = () => {
    if (nuevoPassword.length < 4) {
      alert('La contraseña debe tener al menos 4 caracteres');
      return;
    }
    setUsuario({ ...usuario, password: nuevoPassword });
    localStorage.setItem('usuario', JSON.stringify({ ...usuario, password: nuevoPassword }));
    setNuevoPassword('');
    alert('Contraseña actualizada correctamente');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Mi Perfil</h1>
      <div className="bg-white rounded shadow p-6">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Correo:</label>
          <input
            type="email"
            name="correo"
            value={usuario.correo}
            disabled
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
        {editando ? (
          <button onClick={handleGuardar} className="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
        ) : (
          <button onClick={() => setEditando(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Editar datos</button>
        )}
      </div>
      <div className="bg-white rounded shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-2">Cambiar contraseña</h2>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nuevoPassword}
          onChange={e => setNuevoPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button onClick={handleCambiarPassword} className="bg-orange-500 text-white px-4 py-2 rounded">Cambiar contraseña</button>
      </div>
    </div>
  );
};

export default PerfilUsuario; 