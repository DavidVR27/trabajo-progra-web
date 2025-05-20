import React from 'react';
import { Card } from 'react-bootstrap';
import './Carrito.css';
import Boton from '../../../Components/Boton';

const Carrito = ({ productos, total = 100, delivery = 10, descuentos = 5 }) => {
  const totalPagar = total + delivery - descuentos;

  return (
    <div className="carrito-container">
      <Card style={{ width: '350px' }}>
        <Card.Body>
          <Card.Title>Resumen de la compra</Card.Title>
          <p>Total: S/ {total}</p>
          <p>Delivery: S/ {delivery}</p>
          <p className='descuentos'>Descuentos: -S/ {descuentos}</p>
          <p className='total-carrito'>Total: S/ {totalPagar}</p>
          <Boton
            texto={'Finalizar compra'}
          ></Boton>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Carrito;
