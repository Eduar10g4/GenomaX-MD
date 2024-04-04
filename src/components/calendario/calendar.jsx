import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './styleCalendar.css'


const CalendarMd = () => {
    return (
        <div className="w-full h-max p-4 space-y-4 overflow-y-auto">
            <div className="p-4 border space-y-4 bg-white bg-opacity-95 rounded-md shadow-lg">
                <h1 className="text-emerald-500 text-xl">Agenda tu cita</h1>
                <div className="flex items-center gap-2">
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="">Especialidad</label>
                        <input type="text" className="w-full text-sm text-gray-700 shadow-sm border-2 rounded-md focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500 p-2" placeholder="Buscar por especialidad ..." />
                    </div>
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="">Doctor</label>
                        <select name="" id="" className="w-full pl-2 text-gray-700 font-bold shadow-md bg-gray-300/90 rounded-md text-[13px] border-[1px] border-gray-300 py-2 focus:outline-none focus:bg-gray-100">
                            <option value="" >Selecciona un doctor...</option>
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
                                        className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700 `}
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
    )
}

export default CalendarMd;