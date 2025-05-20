import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../../../Components/Boton';
import { QRCodeSVG } from 'qrcode.react';
import { FaUser, FaCreditCard, FaTruck, FaCheckCircle } from 'react-icons/fa';

const Checkout = () => {
    const navigate = useNavigate();
    const [metodoPago, setMetodoPago] = useState('');
    const [metodoEnvio, setMetodoEnvio] = useState('');
    const [costoEnvio, setCostoEnvio] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalDescuento, setTotalDescuento] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        tipoDocumento: '',
        numeroDocumento: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        numeroTarjeta: '',
        fechaVencimiento: '',
        cvv: ''
    });

    // Verificar si el usuario está autenticado
    useEffect(() => {
        const usuarioAutenticado = localStorage.getItem('usuario');
        if (!usuarioAutenticado) {
            navigate('/login');
        }
    }, [navigate]);

    // Obtener el total y descuento del carrito
    useEffect(() => {
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
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMetodoEnvio = (e) => {
        const metodo = e.target.value;
        setMetodoEnvio(metodo);
        setCostoEnvio(metodo === 'express' ? 20 : 0);
    };

    const validarFormulario = () => {
        const camposRequeridos = ['nombre', 'apellidos', 'tipoDocumento', 'numeroDocumento', 'telefono', 'direccion', 'ciudad', 'codigoPostal'];
        const camposFaltantes = camposRequeridos.filter(campo => !formData[campo]);
        
        if (camposFaltantes.length > 0) {
            alert('Por favor complete todos los campos requeridos');
            return false;
        }

        if (metodoPago === 'tarjeta') {
            if (!formData.numeroTarjeta || !formData.fechaVencimiento || !formData.cvv) {
                alert('Por favor complete los datos de la tarjeta');
                return false;
            }
        }

        if (!metodoEnvio) {
            alert('Por favor seleccione un método de envío');
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validarFormulario()) {
            return;
        }

        // Obtener los productos del carrito
        const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
        
        // Crear el resumen de la compra
        const resumenCompra = {
            productos: carrito,
            subtotal: total,
            descuento: totalDescuento,
            costoEnvio: costoEnvio,
            total: total - totalDescuento + costoEnvio,
            fecha: new Date().toISOString()
        };

        // Aquí iría la lógica para guardar la orden
        const orden = {
            ...formData,
            metodoPago,
            metodoEnvio,
            resumenCompra,
            fecha: new Date().toISOString()
        };

        // Guardar la orden en localStorage
        const ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
        ordenes.push(orden);
        localStorage.setItem('ordenes', JSON.stringify(ordenes));

        // Limpiar el carrito
        localStorage.removeItem('carrito');

        // Mostrar el modal de agradecimiento
        setShowModal(true);

        // Redirigir después de 3 segundos
        setTimeout(() => {
            navigate('/confirmacion-orden');
        }, 3000);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Formulario de envío */}
                <div className="bg-white p-3 rounded-lg shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                        <FaUser className="text-[#FE624C] text-lg" />
                        <h2 className="text-base font-semibold">Identificación</h2>
                    </div>
                    <form className="space-y-2">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Apellidos</label>
                                <input
                                    type="text"
                                    name="apellidos"
                                    value={formData.apellidos}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C]"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
                                <select
                                    name="tipoDocumento"
                                    value={formData.tipoDocumento}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C]"
                                    required
                                >
                                    <option value="DNI">DNI</option>
                                    <option value="Carné de Extranjería">Carné de Extranjería</option>
                                    <option value="Pasaporte">Pasaporte</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Número de Documento</label>
                                <input
                                    type="text"
                                    name="numeroDocumento"
                                    value={formData.numeroDocumento}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C]"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Dirección</label>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C]"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                                <input
                                    type="text"
                                    name="ciudad"
                                    value={formData.ciudad}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                                <input
                                    type="text"
                                    name="codigoPostal"
                                    value={formData.codigoPostal}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C]"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Método de pago y envío */}
                <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg shadow-md">
                        <div className="flex items-center gap-2 mb-2">
                            <FaCreditCard className="text-[#FE624C] text-lg" />
                            <h2 className="text-base font-semibold">Método de Pago</h2>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="metodoPago"
                                        value="tarjeta"
                                        checked={metodoPago === 'tarjeta'}
                                        onChange={(e) => setMetodoPago(e.target.value)}
                                        className="mr-2"
                                    />
                                    Tarjeta de Crédito
                                </label>
                                {metodoPago === 'tarjeta' && (
                                    <div className="mt-3 space-y-3">
                                        <input
                                            type="text"
                                            name="numeroTarjeta"
                                            placeholder="Número de tarjeta"
                                            value={formData.numeroTarjeta}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C]"
                                        />
                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                name="fechaVencimiento"
                                                placeholder="MM/AA"
                                                value={formData.fechaVencimiento}
                                                onChange={handleInputChange}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C]"
                                            />
                                            <input
                                                type="text"
                                                name="cvv"
                                                placeholder="CVV"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C]"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="metodoPago"
                                        value="qr"
                                        checked={metodoPago === 'qr'}
                                        onChange={(e) => setMetodoPago(e.target.value)}
                                        className="mr-2"
                                    />
                                    Código QR
                                </label>
                                {metodoPago === 'qr' && (
                                    <div className="mt-3 flex justify-center">
                                        <QRCodeSVG value="Pago de S/ 100" size={150} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg shadow-md">
                        <div className="flex items-center gap-2 mb-2">
                            <FaTruck className="text-[#FE624C] text-lg" />
                            <h2 className="text-base font-semibold">Método de Envío</h2>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="metodoEnvio"
                                        value="estandar"
                                        checked={metodoEnvio === 'estandar'}
                                        onChange={handleMetodoEnvio}
                                        className="mr-2"
                                    />
                                    Envío Estándar (3-5 días)
                                </div>
                                <span className="text-green-500 font-bold">GRATIS</span>
                            </label>
                            <label className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="metodoEnvio"
                                        value="express"
                                        checked={metodoEnvio === 'express'}
                                        onChange={handleMetodoEnvio}
                                        className="mr-2"
                                    />
                                    Envío Express (1-2 días)
                                </div>
                                <span className="text-gray-600 font-bold">S/ 20.00</span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg shadow-md">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>S/ {total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Descuento</span>
                                <span className="text-red-500">-S/ {totalDescuento.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Envío</span>
                                <span className={costoEnvio > 0 ? "text-gray-600" : "text-green-500"}>
                                    {costoEnvio > 0 ? `S/ ${costoEnvio.toFixed(2)}` : "GRATIS"}
                                </span>
                            </div>
                            <hr className="my-2 border-gray-200" />
                            <div className="flex justify-between font-semibold">
                                <span>TOTAL</span>
                                <span>S/ {(total - totalDescuento + costoEnvio).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <Boton
                                texto="Completar Orden"
                                onClick={handleSubmit}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de agradecimiento */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="text-center">
                            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">¡Gracias por tu compra!</h3>
                            <p className="text-gray-600 mb-4">
                                Tu orden ha sido procesada exitosamente. Serás redirigido a la página de confirmación en unos segundos.
                            </p>
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FE624C] mx-auto"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;    