import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const Navbar = () => {
    const [openMas, setOpenMas] = useState(false);

    const optionBtnsData = [
        { icon: <FaPlusCircle />, title: 'Crear Paciente' },
        { icon: <FaPlusCircle />, title: 'Crear Ingreso' },
        { icon: <FaPlusCircle />, title: 'Crear Agenda' },
        { icon: <FaPlusCircle />, title: 'Crear Factura' },
        { icon: <FaPlusCircle />, title: 'Crear Radicado' },
        { icon: <FaPlusCircle />, title: 'Crear Rips' }
    ];

    return (
        <>
            <nav className="bg-sky-800 bg-opacity-50 backdrop-blur-sm shadow-b-md shadow-gray-800 p-4 py-3">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center text-white text-md">
                        <button onClick={() => setOpenMas(!openMas)}><FaPlusCircle /></button>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="px-3 py-1 mr-4 rounded-md bg-gray-700 text-white focus:outline-none"
                        />
                        <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white">
                            Buscar
                        </button>
                    </div>
                </div>
            </nav>
            {openMas && (
                <div className="fixed bg-white rounded-md z-50">
                    <ul>
                        {
                            optionBtnsData.map((data, index) => (
                                <div key={index} className="hover:bg-gray-300 my-2 px-2 cursor-pointer">
                                    <li className="flex items-center gap-1.5">{data.icon}{data.title}</li>
                                </div>
                            ))
                        }
                    </ul>
                </div>
            )}
        </>
    );
};

export default Navbar;
