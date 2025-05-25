import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaUserPlus } from 'react-icons/fa';
import './Navbar.css'; // Archivo CSS para estilos

const CATEGORIAS_POR_DEFECTO = [
  { id: '1', nombre: 'Alimentos' },
  { id: '2', nombre: 'Bebidas' },
  { id: '3', nombre: 'Limpieza' }
];

const Navbar = () => {
  const [categorias, setCategorias] = useState([]);

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

  return (
    <nav className="navbar font-sans">
      {/* Sección izquierda */}
      <div className="navbar-left">
        <h1 className="navbar-logo text-2xl font-bold">Mi-Tiendita</h1>
        <ul className="navbar-links">
          <li><Link to="/" className="hover:text-[#FE624C] transition-colors">Home</Link></li>
          <li className="navbar-categorias-dropdown">
            <span className="hover:text-[#FE624C] transition-colors">Categorías ▼</span>
            <ul className="dropdown-menu">
              {categorias.length === 0 && <li>No hay categorías</li>}
              {categorias.map((cat) => (
                <li key={cat.id || cat.nombre}>
                  <Link to={`/categoria/${cat.nombre}`} className="hover:text-[#FE624C] transition-colors">{cat.nombre}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li><a href="#productos" className="hover:text-[#FE624C] transition-colors">Productos</a></li>
          <li><a href="#nosotros" className="hover:text-[#FE624C] transition-colors">Nosotros</a></li>
          <li><Link to="/historial-pedidos" className="hover:text-[#FE624C] transition-colors">Historial de pedidos</Link></li>
          <li><Link to="/perfil" className="hover:text-[#FE624C] transition-colors">Mi perfil</Link></li>
          <li><Link to="/admin/dashboard" className="hover:text-[#FE624C] transition-colors">Admin</Link></li>
        </ul>
      </div>

      {/* Sección central */}
      <div className="navbar-center">
        <input
          type="text"
          className="navbar-search"
          placeholder="Buscar productos..."
        />
      </div>

      {/* Sección derecha */}
      <div className="navbar-right flex gap-4 items-center">
        <Link to="/carritopage" className="flex flex-col items-center cursor-pointer hover:text-[#FE624C] transition-colors" title="Mi carrito">
          <FaShoppingCart className="text-2xl" />
          <span className="text-sm">Mi carrito</span>
        </Link>
        <Link to="/login" className="flex flex-col items-center cursor-pointer hover:text-[#FE624C] transition-colors" title="Iniciar sesión">
          <FaUser className="text-2xl" />
          <span className="text-sm">Iniciar sesión</span>
        </Link>
        <Link to="/registro" className="flex flex-col items-center cursor-pointer hover:text-[#FE624C] transition-colors" title="Registrar usuario">
          <FaUserPlus className="text-2xl" />
          <span className="text-sm">Registrar</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;