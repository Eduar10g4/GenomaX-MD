import React, { useState, useEffect } from "react";
import { BiCalendarWeek } from "react-icons/bi";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './styleCalendar.css'
import CalendarMeet from "../calendarMeet/calendarMeet";

const Agendamiento = () => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState('');
    const [fechaActual, setFechaActual] = useState(new Date());

    useEffect(() => {
        const fechaActualISO = new Date().toISOString().split('T')[0];
        setFechaSeleccionada(fechaActualISO);
    }, []);

    const handleFechaSeleccionada = (date) => {
        const fechaSeleccionadaISO = date.toISOString().split('T')[0];
        console.log('fecha seleccionada', fechaSeleccionadaISO);
        setFechaSeleccionada(fechaSeleccionadaISO);
    }

    return (
        <>
            <div className="h-full border gap-5 m-2">
                <div className="w-full h-max bg-sky-700 flex items-center justify-between gap-1 text-white text-md font-semibold rounded-t-md p-3">
                    <div className="flex items-center gap-1">
                        <BiCalendarWeek />
                        <h1 className="">Agenda tu cita</h1>
                    </div>
                </div>
                <div className="h-[85%] flex gap-5 p-2">
                    <div className="w-[70%] h-full px-0">
                        <div className="w-full flex items-center justify-center h-max border p-2">
                            <h1> AGENDA DEL DÍA {fechaSeleccionada} </h1>
                        </div>
                        <CalendarMeet fechaSeleccionada={fechaSeleccionada} />
                    </div>
                    <div className="w-[30%] max-w-[30%] h-max">
                        <Calendar onChange={handleFechaSeleccionada} value={fechaActual} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Agendamiento;
