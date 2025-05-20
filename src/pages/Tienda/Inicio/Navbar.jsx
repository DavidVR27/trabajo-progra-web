import React from 'react';
import './Navbar.css'; // Archivo CSS para estilos

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Sección izquierda */}
      <div className="navbar-left">
        <h1 className="navbar-logo">Mi-Tiendita</h1>
        <ul className="navbar-links">
          <li><a href="#categorias">Categorías</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
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
      <div className="navbar-right">
        <button className="navbar-icon">🛒</button>
        <button className="navbar-icon">👤</button>
      </div>
    </nav>
  );
};

export default Navbar;