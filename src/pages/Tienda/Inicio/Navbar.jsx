import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Archivo CSS para estilos

const CATEGORIAS_POR_DEFECTO = [
  { id: '1', nombre: 'Alimentos' },
  { id: '2', nombre: 'Bebidas' },
  { id: '3', nombre: 'Limpieza' }
];

const Navbar = () => {
  const [categorias, setCategorias] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarCategorias = () => {
      const cats = JSON.parse(localStorage.getItem('categorias')) || [];
      // Unir las categorías por defecto con las del localStorage, evitando duplicados
      const nombresExistentes = cats.map(c => c.nombre);
      const categoriasCompletas = [
        ...CATEGORIAS_POR_DEFECTO.filter(def => !nombresExistentes.includes(def.nombre)),
        ...cats
      ];
      setCategorias(categoriasCompletas);
    };
    cargarCategorias();
    window.addEventListener('categoriasActualizadas', cargarCategorias);
    return () => {
      window.removeEventListener('categoriasActualizadas', cargarCategorias);
    };
  }, []);

  useEffect(() => {
    // Detectar usuario logueado
    try {
      const user = JSON.parse(localStorage.getItem('usuario'));
      setUsuarioLogueado(user && user.correo ? user : null);
    } catch {
      setUsuarioLogueado(null);
    }
    // Escuchar cambios en el localStorage (por ejemplo, al cerrar sesión)
    const onStorage = () => {
      try {
        const user = JSON.parse(localStorage.getItem('usuario'));
        setUsuarioLogueado(user && user.correo ? user : null);
      } catch {
        setUsuarioLogueado(null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuarioLogueado(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Sección izquierda */}
      <div className="navbar-left">
        <h1 className="navbar-logo">Mi-Tiendita</h1>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li className="navbar-categorias-dropdown">
            <span>Categorías ▼</span>
            <ul className="dropdown-menu">
              {categorias.length === 0 && <li>No hay categorías</li>}
              {categorias.map((cat) => (
                <li key={cat.id || cat.nombre}>
                  <Link to={`/categoria/${cat.nombre}`}>{cat.nombre}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/historial-pedidos">Historial de pedidos</Link></li>
          <li><Link to="/perfil">Mi perfil</Link></li>
          <li><Link to="/admin/dashboard">Admin</Link></li>
        </ul>
      </div>

      {/* Sección derecha */}
      <div className="navbar-right flex gap-4 items-center">
        <Link to="/carritopage" className="flex flex-col items-center cursor-pointer" title="Mi carrito">
          <button className="navbar-icon" style={{ cursor: 'pointer' }}>🛒</button>
          <span style={{ fontSize: '0.75rem' }}>Mi carrito</span>
        </Link>
        {usuarioLogueado ? (
          <button onClick={handleCerrarSesion} className="flex flex-col items-center cursor-pointer text-white" title="Cerrar sesión" style={{ background: 'none', border: 'none' }}>
            <span className="navbar-icon" style={{ fontSize: '1.5rem' }}>🚪</span>
            <span style={{ fontSize: '0.75rem' }}>Cerrar sesión</span>
          </button>
        ) : (
          <>
            <Link to="/login" className="flex flex-col items-center cursor-pointer" title="Iniciar sesión">
              <button className="navbar-icon" style={{ cursor: 'pointer' }}>👤</button>
              <span style={{ fontSize: '0.75rem' }}>Iniciar sesión</span>
            </Link>
            <Link to="/registro" className="flex flex-col items-center cursor-pointer" title="Registrar usuario">
              <button className="navbar-icon" style={{ cursor: 'pointer' }}>📝</button>
              <span style={{ fontSize: '0.75rem' }}>Registrar</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;