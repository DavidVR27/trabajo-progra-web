import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../../../Components/Boton';

const Registro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Aquí iría la lógica de registro
        // Por ahora, solo guardamos el email en localStorage
        localStorage.setItem('usuario', formData.email);
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Crear una cuenta
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="nombre" className="sr-only">Nombre completo</label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#FE624C] focus:border-[#FE624C] focus:z-10 sm:text-sm"
                                placeholder="Nombre completo"
                                value={formData.nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Correo electrónico</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#FE624C] focus:border-[#FE624C] focus:z-10 sm:text-sm"
                                placeholder="Correo electrónico"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#FE624C] focus:border-[#FE624C] focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">Confirmar contraseña</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#FE624C] focus:border-[#FE624C] focus:z-10 sm:text-sm"
                                placeholder="Confirmar contraseña"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <Boton
                            texto="Registrarse"
                            onClick={handleSubmit}
                            className="w-full"
                        />
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            ¿Ya tienes una cuenta?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="font-medium text-[#FE624C] hover:text-[#FE624C]"
                            >
                                Inicia sesión
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registro;
