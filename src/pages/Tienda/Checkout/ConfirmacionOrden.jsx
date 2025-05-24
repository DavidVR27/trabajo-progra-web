import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Boton from '../../../Components/Boton';

const ConfirmacionOrden = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4">¡Pedido Confirmado!</h1>
                <p className="text-gray-600 mb-8">
                    Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
                    Te enviaremos un correo electrónico con los detalles de tu compra.
                </p>
                <div className="space-y-4">
                    <Boton
                        texto="Ver Historial de Pedidos"
                        onClick={() => navigate('/historial-pedidos')}
                    />
                    <button
                        onClick={() => navigate('/')}
                        className="text-[#FE624C] hover:text-[#e5533d] font-medium"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmacionOrden; 