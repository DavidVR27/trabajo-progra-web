import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Checkout from './pages/Tienda/Checkout/Checkout';
import Login from './pages/Auth/Login/Login';
import Registro from './pages/Auth/Registro/Registro';
import Inicio from './pages/Tienda/Inicio/Inicio';
import Navbar from './pages/Tienda/Inicio/Navbar';
import CarritoPage from './pages/Tienda/Carrito/CarritoPage';
import Direccion from './pages/Tienda/Checkout/Direccion';
import Pago from './pages/Tienda/Checkout/Pago';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="pt-16"> {/* Espacio para el navbar fijo */}
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/carritopage" element={<CarritoPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/tienda/checkout/direccion" element={<Direccion />} />
            <Route path="/tienda/checkout/pago" element={<Pago />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
