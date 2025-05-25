import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { carritoService } from '../services/carritoService';
import './ProductoCard.css';

const ProductoCard = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const [mostrarCantidad, setMostrarCantidad] = useState(false);

  const precioConDescuento = producto.descuento > 0
    ? producto.precio * (1 - producto.descuento / 100)
    : producto.precio;

  const agregarAlCarrito = (e) => {
    e.preventDefault(); // Prevenir la navegación al hacer clic en el botón
    carritoService.agregarProducto(producto, cantidad);
    alert('Producto agregado al carrito');
    setCantidad(1);
    setMostrarCantidad(false);
  };

  return (
    <div className="producto-card">
      <Link to={`/detalle-producto/${producto.id}`} className="producto-link">
        <div className="producto-imagen">
          <img src={producto.imagen} alt={producto.nombre} />
          {producto.descuento > 0 && (
            <span className="descuento-badge">-{producto.descuento}%</span>
          )}
        </div>
        <div className="producto-info">
          <h3 className="producto-nombre">{producto.nombre}</h3>
          {producto.categoria && (
            <span className="producto-categoria">{producto.categoria}</span>
          )}
          <div className="producto-precio">
            {producto.descuento > 0 ? (
              <>
                <span className="precio-original">S/ {producto.precio}</span>
                <span className="precio-descuento">S/ {precioConDescuento.toFixed(2)}</span>
              </>
            ) : (
              <span className="precio-normal">S/ {producto.precio}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="producto-acciones">
        {mostrarCantidad ? (
          <div className="cantidad-controls">
            <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
            <span>{cantidad}</span>
            <button onClick={() => setCantidad(cantidad + 1)}>+</button>
            <button className="confirmar-cantidad" onClick={agregarAlCarrito}>
              Confirmar
            </button>
          </div>
        ) : (
          <button 
            className="agregar-carrito-btn"
            onClick={() => setMostrarCantidad(true)}
          >
            Añadir al carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductoCard; 