import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../../../Components/Boton';
import { QRCodeSVG } from 'qrcode.react';

const Checkout = () => {
    const navigate = useNavigate();
    const [metodoPago, setMetodoPago] = useState('');
    const [metodoEnvio, setMetodoEnvio] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        telefono: '',
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validarFormulario = () => {
        const camposRequeridos = ['nombre', 'direccion', 'ciudad', 'codigoPostal', 'telefono'];
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

        // Aquí iría la lógica para guardar la orden
        const orden = {
            ...formData,
            metodoPago,
            metodoEnvio,
            fecha: new Date().toISOString()
        };

        // Guardar la orden en localStorage
        const ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
        ordenes.push(orden);
        localStorage.setItem('ordenes', JSON.stringify(ordenes));

        // Limpiar el carrito
        localStorage.removeItem('carrito');

        // Redirigir a una página de confirmación
        navigate('/confirmacion-orden');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Formulario de envío */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Información de Envío</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
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
                        <div className="grid grid-cols-2 gap-4">
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
                    </form>
                </div>

                {/* Método de pago y envío */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
                        <div className="space-y-4">
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
                                    <div className="mt-4 space-y-4">
                                        <input
                                            type="text"
                                            name="numeroTarjeta"
                                            placeholder="Número de tarjeta"
                                            value={formData.numeroTarjeta}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FE624C] focus:ring-[#FE624C]"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
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
                                    <div className="mt-4 flex justify-center">
                                        <QRCodeSVG value="Pago de S/ 100" size={200} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Método de Envío</h2>
                        <div className="space-y-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="metodoEnvio"
                                    value="estandar"
                                    checked={metodoEnvio === 'estandar'}
                                    onChange={(e) => setMetodoEnvio(e.target.value)}
                                    className="mr-2"
                                />
                                Envío Estándar (3-5 días)
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="metodoEnvio"
                                    value="express"
                                    checked={metodoEnvio === 'express'}
                                    onChange={(e) => setMetodoEnvio(e.target.value)}
                                    className="mr-2"
                                />
                                Envío Express (1-2 días)
                            </label>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <Boton
                            texto="Completar Orden"
                            onClick={handleSubmit}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;    