import React from 'react';
import Carrito from './Carrito';
import Navbar from '../Inicio/Navbar';
import './Checkout.css';

const Checkout = () => {
  return (
    <div className='checkout-container'>
      <Navbar />
      <div className='checkout-content'>
        <Carrito />
      </div>
    </div>
  );
};

export default Checkout;
