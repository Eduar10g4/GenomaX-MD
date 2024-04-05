import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { BiCalendarWeek } from "react-icons/bi";
import 'react-calendar/dist/Calendar.css';
import './styleCalendar.css'


const CalendarMd = ({ nxsdb }) => {

    const [codigo_USR, setCodigo_USR] = useState('');
    const [token, setToken] = useState('');
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Obtener los valores de token y codigo Usuario
        const token = sessionStorage.getItem('token');
        const activoUSR = sessionStorage.getItem('Activo_USR');
        setToken(token);
        setCodigo_USR(activoUSR);

    }, [])

    const handleSpecialties = async () => {

        const formData = new FormData();
        formData.append('Codigo_USR', codigo_USR);
        formData.append('nxs_db', nxsdb);

        setLoading(true);

        try {
            const response = await fetch('https://apimd.genomax.app/api/showSpecialties', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setSpecialties(data.Especialidades);

                Swal.fire({
                    icon: 'success',
                    title: 'Login exitoso',
                    text: 'Bienvenido!',
                });

            } else {
                // Si la respuesta tiene error, mostrar mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el login',
                    text: 'Credenciales inválidas',
                });
            }
        } catch (error) {
            // Si hay un error en la solicitud, mostrar mensaje de error
            console.error('Error al enviar la solicitud:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full space-y-4 p-4 pr-0">
            <div className="border bg-white bg-opacity-95 rounded-lg shadow-md">
                <div className="w-full h-max bg-sky-700 flex items-center gap-1 text-white text-md font-semibold rounded-t-md p-3">
                    <BiCalendarWeek />
                    <h1 className="">Agenda tu cita</h1>
                </div>
                <div className="space-y-4 p-4 pt-6">
                    <div className="flex items-center gap-2 pb-4">
                        <div className="w-[50%] flex flex-col relative">
                            <label htmlFor="">Especialidad</label>
                            <input type="text" className="w-full text-sm text-gray-700 shadow-sm border-2 rounded-md focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500 p-2" placeholder="Buscar por especialidad ..." onFocus={handleSpecialties} />
                            {loading ? (
                                <p>Cargando especialidades...</p>
                            ) : (
                                <div className="w-full h-20 absolute top-16 bg-white border shadow-md p-2 overflow-y-auto">
                                    {specialties.map(specialty => (
                                        <div key={specialty.Codigo_ESP}>
                                            <h3>{specialty.Nombre_ESP}</h3>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="w-[50%] flex flex-col">
                            <label htmlFor="">Doctor</label>
                            <select name="" id="" className="w-full text-sm text-gray-700 shadow-sm border-2 rounded-md focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500 p-2">
                                <option value="" className="" >Selecciona un doctor...</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Calendar />
                    </div>
                    <div className="w-full h-full pt-4">
                        {/* Contenido del segundo div */}
                        <h2 className='text-xl font-bold text-gray-200 mt-1 mb-1'>Datos De La cita</h2>
                        <div className="bg-glass backdrop-blur-glass">
                            <div className="p-4 bg-white bg-opacity-80 rounded-md">
                                <form action="" >
                                    {/* Contenido de tu componente */}
                                    <p className='text-gray-600'><strong>Especialidad:</strong> <span className='text-[15px] underline'></span></p>
                                    <p className='text-gray-600'><strong>Doctor:</strong> <span className='text-[15px] underline'></span></p>
                                    <div className='flex items-center gap-1'>
                                        <p className='text-gray-600'><strong>Fecha Cita:</strong></p>
                                    </div>
                                    <div className='w-full h-full flex justify-end items-end'>
                                        <button
                                            type="submit"
                                            className={`bg-sky-700 text-white px-4 py-2 mt-4 rounded hover:bg-sky-800 `}
                                        // disabled={isSaveButtonDisabled}
                                        >
                                            Guardar Cita
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarMd;