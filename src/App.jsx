import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './pages/Tienda/Carrito/Checkout';

const App = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Checkout />
    </div>
  );
};

export default App;