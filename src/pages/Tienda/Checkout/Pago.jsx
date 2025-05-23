import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../../../Components/Boton';
import { FaCreditCard, FaQrcode, FaShoppingCart, FaCheck, FaTruck, FaPaypal } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';

const Pago = () => {
    const navigate = useNavigate();
    const [metodoPago, setMetodoPago] = useState('');
    const [total, setTotal] = useState(0);
    const [totalDescuento, setTotalDescuento] = useState(0);
    const [totalProductos, setTotalProductos] = useState(0);
    const [formData, setFormData] = useState({
        numeroTarjeta: '',
        nombreTarjeta: '',
        fechaVencimiento: '',
        cvv: ''
    });

    useEffect(() => {
        // Obtener datos del carrito
        const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
        const totalCarrito = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        const descuentoCarrito = carrito.reduce((acc, item) => {
            if (item.descuento) {
                return acc + (item.precio * item.descuento * item.cantidad);
            }
            return acc;
        }, 0);
        
        setTotal(totalCarrito);
        setTotalDescuento(descuentoCarrito);
        setTotalProductos(carrito.length);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validarFormulario = () => {
        if (metodoPago === 'tarjeta') {
            const camposRequeridos = ['numeroTarjeta', 'nombreTarjeta', 'fechaVencimiento', 'cvv'];
            const camposFaltantes = camposRequeridos.filter(campo => !formData[campo]);
            
            if (camposFaltantes.length > 0) {
                alert('Por favor complete todos los datos de la tarjeta');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            // Aquí iría la lógica para procesar el pago
            navigate('/confirmacion-orden');
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Process Stepper */}
            <div className="mb-8">
                <div className="flex items-center justify-center">
                    <div className="flex items-center">
                        <div className="flex items-center relative">
                            <div className="rounded-full h-10 w-10 py-3 px-3 bg-[#FE624C] text-white font-bold border-2 border-[#FE624C]">
                                <FaCheck className="h-full w-full" />
                            </div>
                            <div className="absolute top-0 left-0 mt-12 w-32 text-center text-sm font-medium text-[#FE624C]">
                                Carrito
                            </div>
                        </div>
                        <div className="flex-auto border-t-2 border-[#FE624C] w-32"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center relative">
                            <div className="rounded-full h-10 w-10 py-3 px-3 bg-[#FE624C] text-white font-bold border-2 border-[#FE624C]">
                                <FaCheck className="h-full w-full" />
                            </div>
                            <div className="absolute top-0 left-0 mt-12 w-32 text-center text-sm font-medium text-[#FE624C]">
                                Envío
                            </div>
                        </div>
                        <div className="flex-auto border-t-2 border-[#FE624C] w-32"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center relative">
                            <div className="rounded-full h-10 w-10 py-3 px-3 bg-[#FE624C] text-white font-bold border-2 border-[#FE624C]">
                                <FaCreditCard className="h-full w-full" />
                            </div>
                            <div className="absolute top-0 left-0 mt-12 w-32 text-center text-sm font-medium text-[#FE624C]">
                                Pago
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">Método de Pago</h1>
            
            <div className="flex flex-row items-start gap-6">
                {/* Opciones de pago */}
                <div className="w-3/5">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="space-y-8">
                            {/* Opción de tarjeta */}
                            <div>
                                <label className="flex items-center gap-3 mb-6">
                                    <input
                                        type="radio"
                                        name="metodoPago"
                                        value="tarjeta"
                                        checked={metodoPago === 'tarjeta'}
                                        onChange={(e) => setMetodoPago(e.target.value)}
                                        className="w-5 h-5 text-[#FE624C]"
                                    />
                                    <FaCreditCard className="text-[#FE624C] text-2xl" />
                                    <span className="font-medium text-lg">Pagar con tarjeta</span>
                                </label>
                                
                                {metodoPago === 'tarjeta' && (
                                    <div className="ml-8 space-y-6">
                                        <div className="flex gap-6 mb-6">
                                            <img src="/visa.png" alt="Visa" className="h-10" />
                                            <img src="/mastercard.png" alt="Mastercard" className="h-10" />
                                            <img src="/visa-electron.png" alt="Visa Electron" className="h-10" />
                                            <FaPaypal className="text-blue-500 text-4xl" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">Número de tarjeta</label>
                                            <input
                                                type="text"
                                                name="numeroTarjeta"
                                                value={formData.numeroTarjeta}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C] h-12 text-lg"
                                                placeholder="1234 5678 9012 3456"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">Nombre en la tarjeta</label>
                                            <input
                                                type="text"
                                                name="nombreTarjeta"
                                                value={formData.nombreTarjeta}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C] h-12 text-lg"
                                                placeholder="JUAN PEREZ"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-3">Fecha de vencimiento</label>
                                                <input
                                                    type="text"
                                                    name="fechaVencimiento"
                                                    value={formData.fechaVencimiento}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C] h-12 text-lg"
                                                    placeholder="MM/AA"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-3">CVV</label>
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C] h-12 text-lg"
                                                    placeholder="123"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Opción de QR */}
                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="metodoPago"
                                        value="qr"
                                        checked={metodoPago === 'qr'}
                                        onChange={(e) => setMetodoPago(e.target.value)}
                                        className="w-5 h-5 text-[#FE624C]"
                                    />
                                    <FaQrcode className="text-[#FE624C] text-2xl" />
                                    <span className="font-medium text-lg">Pagar con QR</span>
                                </label>
                                
                                {metodoPago === 'qr' && (
                                    <div className="ml-8 mt-6 flex flex-col items-center">
                                        <QRCodeSVG 
                                            value={`Pago de S/ ${(total - totalDescuento).toFixed(2)}`} 
                                            size={250}
                                            className="mb-6"
                                        />
                                        <p className="text-base text-gray-600">
                                            Escanea el código QR con tu aplicación de banca móvil
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resumen de la compra */}
                <div className="w-2/5">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center gap-2 mb-4">
                            <FaShoppingCart className="text-[#FE624C] text-lg" />
                            <h2 className="text-lg font-semibold">Resumen de la Compra</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal ({totalProductos} productos)</span>
                                <span>S/ {total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Descuento</span>
                                <span className="text-red-500">-S/ {totalDescuento.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Envío</span>
                                <span className="text-green-500">GRATIS</span>
                            </div>
                            <hr className="my-4 border-gray-200" />
                            <div className="flex justify-between font-semibold text-lg">
                                <span>TOTAL</span>
                                <span>S/ {(total - totalDescuento).toFixed(2)}</span>
                            </div>
                            <div className="mt-6">
                                <Boton
                                    texto="Confirmar Pago"
                                    onClick={handleSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pago;
