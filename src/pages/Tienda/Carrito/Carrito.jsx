import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Carrito.css';

const Carrito = ({ productos, total = 100, delivery = 10, descuentos = 5 }) => {
  const totalPagar = total + delivery - descuentos;

  return (
    <div className="carrito-container">
      <Card style={{ width: '350px' }}>
        <Card.Body>
          <Card.Title>Resumen de Carrito</Card.Title>
          <p>Total: S/ {total}</p>
          <p>Delivery: S/ {delivery}</p>
          <p>Descuentos: -S/ {descuentos}</p>
          <p>Total a Pagar: S/ {totalPagar}</p>
          <Button variant="primary">Continuar Compra</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Carrito;
