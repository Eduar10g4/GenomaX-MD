import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { ImExit } from "react-icons/im";

const Navbar = () => {
    const [openMas, setOpenMas] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    const optionBtnsData = [
        { icon: <FaPlusCircle />, title: 'Crear Paciente' },
        { icon: <FaPlusCircle />, title: 'Crear Ingreso' },
        { icon: <FaPlusCircle />, title: 'Crear Agenda' },
        { icon: <FaPlusCircle />, title: 'Crear Factura' },
        { icon: <FaPlusCircle />, title: 'Crear Radicado' },
        { icon: <FaPlusCircle />, title: 'Crear Rips' }
    ];

    const username = sessionStorage.getItem('Nombre_USR');

    // Obtener las iniciales del primer nombre y primer apellido
    const inicialesNombre = username
        ? username
            .split(' ')
            .filter((word, index) => index === 0 || index === 2) // Selecciona el primer nombre y el primer apellido
            .map((word) => word[0])
            .join('')
        : '';

    {/*** Funcion para cerrar sesión ***/ }
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('ID_USR');
        sessionStorage.removeItem('Nombre_USR');
        sessionStorage.removeItem('Email_USR');
        sessionStorage.removeItem('Activo_USR');
        localStorage.removeItem('nxsdbParam');
        window.location.reload();
    };

    return (
        <>
            <nav className="shadow-gray-800 p-4 pl-20 py-1.5" style={{
                background: "rgba(255, 255, 255, 0.25)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                WebkitBackdropFilter: "blur(9.5px)",
                backdropFilter: "blur(9.5px)",
               // borderRadius: "10px",
                //border: "1px solid rgba(255, 255, 255, 0.18)"
            }}>
                <div className="flex justify-between items-center">
                    <div className="flex justify-center items-center text-white text-md relative">
                        <button onClick={() => setOpenMas(!openMas)}><FaPlusCircle /></button>
                        {openMas && (
                            <div className="w-max absolute bg-white rounded-md z-50 border border-gray-200 shadow-lg top-[34px]">
                                <ul>
                                    {
                                        optionBtnsData.map((data, index) => (
                                            <div key={index} className="hover:bg-gray-300 my-2 px-2 cursor-pointer">
                                                <li className="flex items-center text-[15px] text-gray-800 gap-1.5">{data.icon}{data.title}</li>
                                            </div>
                                        ))
                                    }
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className=" flex justify-center items-center">
                        <div className="flex justify-end items-center relative">
                            <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center" onClick={() => setOpenProfile(!openProfile)}>
                                {inicialesNombre}
                            </button>
                            {openProfile && (
                                <div className="w-max absolute bg-white rounded-md z-50 border border-gray-200 shadow-lg -right-[16px] top-[52px]">
                                    <div className="border-b border-gray-300 px-2 py-3">
                                        <h1>Bienvenido!</h1>
                                        <p className="text-sm text-blue-500">{username}</p>
                                    </div>
                                    <button className="w-full flex items-center hover:bg-gray-300 gap-1 px-2 py-3" onClick={handleLogout}>
                                        <ImExit />
                                        <p>Cerrar Sesión</p>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
