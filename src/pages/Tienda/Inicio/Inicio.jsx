import React from 'react';
import { Link } from 'react-router-dom';
import Boton from '../../../Components/Boton';

const Inicio = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Bienvenido a Mi-Tiendita
                </h1>
                <p className="text-xl text-gray-600">
                    Tu tienda de confianza para productos de calidad
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Categorías destacadas */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">Categorías</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/categorias/alimentos" className="text-[#FE624C] hover:underline">
                                Alimentos
                            </Link>
                        </li>
                        <li>
                            <Link to="/categorias/bebidas" className="text-[#FE624C] hover:underline">
                                Bebidas
                            </Link>
                        </li>
                        <li>
                            <Link to="/categorias/limpieza" className="text-[#FE624C] hover:underline">
                                Limpieza
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Ofertas especiales */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">Ofertas Especiales</h2>
                    <div className="space-y-4">
                        <div className="border-b pb-4">
                            <h3 className="font-medium">Descuentos del día</h3>
                            <p className="text-gray-600">Hasta 50% de descuento en productos seleccionados</p>
                        </div>
                        <div>
                            <h3 className="font-medium">Envío gratis</h3>
                            <p className="text-gray-600">En compras mayores a S/ 100</p>
                        </div>
                    </div>
                </div>
                {/* Acciones rápidas */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">Acciones Rápidas</h2>
                    <div className="space-y-4">
                        <Link to="/carritopage">
                            <Boton
                                texto="Ir al Carrito"
                                className="w-full"
                            />
                        </Link>
                        <Link to="/productos">
                            <Boton
                                texto="Ver Productos"
                                className="w-full"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;
