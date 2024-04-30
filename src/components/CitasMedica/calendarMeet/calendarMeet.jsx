import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaWpforms } from "react-icons/fa";
import './styleAgendaMeet.css'
import moment from "moment";
import Draggable from "react-draggable";


const CalendarMeet = () => {

    moment.locale("es");
    moment.updateLocale("es", {
        weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        months: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ],
        days: [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo",
        ],
    });

    // Datos Cita
    const [formDataCita, setFormDataCita] = useState({
        fechaAgenda: '',
        horaAgenda: '',
        servicio: '',
        nombreServicio: '',
        area: '',
        tipoConsulta: '',
        fechaDeseada: '',
        tipoAtencion: '',
        profesional: '',
        paciente: '',
        nombrePaciente: '',
        nota: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormDataCita({ ...formDataCita, [name]: value });
    };

    const localizer = momentLocalizer(moment);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // Maneja la selección de una ranura de tiempo en el calendario
    const handleSelectSlot = ({ start }) => {
        // console.log(start)
        const fechaSeleccionadaISO = start.toISOString().split('T')[0];
        setIsOpen(true);
        setFormDataCita({
            ...formDataCita,
            fechaAgenda: fechaSeleccionadaISO
        });
        // setSelectedDate(fechaSeleccionadaISO);
        //setStartDate(start);
        // setEndDate(start); // Por defecto, la fecha de inicio y fin es la misma
        // setContent("");
    };

    return (
        <>
            <div className="w-full h-full rounded-md">
                <Calendar
                    localizer={localizer}
                    // events={formattedEvents}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    //  onSelectEvent={handleEventClick}
                    // Usa la configuración personalizada de vistas
                    messages={{
                        today: "Hoy",
                        previous: "Atrás",
                        next: "Adelante",
                        month: "Mes",
                        week: "Semana",
                        day: "Día",
                    }}
                //defaultView="" // Vista por defecto
                // onView={handleViewChange} // Cambiar la vista
                //view={view} // Establecer la vista actual
                // defaultDate={moment().toDate()}
                // defaultView="day"
                //toolbar={null}
                />
            </div>
            {isOpen && (
                <Draggable cancel=".cancel-drag">
                    <div id="defaultModal" tabindex="-1" aria-hidden="true" className="fixed inset-0 flex flex-col gap-4 items-center justify-center z-50 px-20">
                        <div class="relative w-full h-max shadow-md">

                            <div class="h-full bg-white rounded-md shadow overflow-y-auto">
                                <div className="flex w-full items-center justify-between bg-sky-700 text-white cursor-pointer rounded-t-md p-2 px-4">
                                    <div className="flex items-center gap-1">
                                        <button className="text-xl">
                                            <FaWpforms />
                                        </button>
                                        <p>Nueva Cita</p>
                                    </div>
                                    <button onClick={() => setIsOpen(false)} type="button" className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="cancel-drag p-8">
                                    <div className="bg-gray-100 w-full h-[50%] overflow-y-auto md:h-max shadow-gray-400 border-[1px] p-4 px-5 pr-8 rounded-lg shadow-md mb-4">
                                        <div className="w-full space-y-6" >
                                            <div className="flex gap-2 flex-col lg:flex-row w-full items-center space-x-1 space-y-2 lg:space-y-0">

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="fechaAgenda" className="block text-sm font-medium text-sky-700 mb-1">Fecha Agenda</label>
                                                    <input
                                                        type="date"
                                                        name="fechaAgenda"
                                                        id="fechaAgenda"
                                                        value={formDataCita.fechaAgenda}
                                                        onChange={handleInputChange}
                                                        // onKeyDown={handleEnterKeyPress}
                                                        className="flex-1 px-2 bg-gray-300 block w-full min-w-0 rounded-md sm:text-sm py-2"
                                                        disabled
                                                    />
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="horaAgenda" className="block text-sm font-medium text-sky-700 mb-1">Hora Agenda</label>
                                                    <input
                                                        value={formDataCita.horaAgenda}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        name="horaAgenda"
                                                        id="horaAgenda"
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    />
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="servicio" className="block text-sm font-medium text-sky-700 mb-1">Servicio</label>
                                                    <input
                                                        value={formDataCita.servicio}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        name="servicio"
                                                        id="servicio"
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    />
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="nombreServicio" className="block text-sm font-medium text-sky-700 mb-1">Nombre Servicio</label>
                                                    <input
                                                        value={formDataCita.nombreServicio}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        name="nombreServicio"
                                                        id="nombreServicio"
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    />
                                                </div>

                                            </div>
                                            <div className="flex gap-2 flex-col lg:flex-row w-full items-center space-x-1 space-y-2 lg:space-y-0">

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="area" className="block text-sm font-medium text-sky-700 mb-1">Area</label>
                                                    <input
                                                        type="text"
                                                        name="area"
                                                        id="area"
                                                        value={formDataCita.area}
                                                        onChange={handleInputChange}
                                                        // onKeyDown={handleEnterKeyPress}
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    />
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="tipoConsulta" className="block text-sm font-medium text-sky-700 mb-1">Tipo Consulta</label>
                                                    <input
                                                        value={formDataCita.tipoConsulta}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        name="tipoConsulta"
                                                        id="tipoConsulta"
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    />
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="fechaDeseada" className="block text-sm font-medium text-sky-700 mb-1">Fecha Deseada</label>
                                                    <input
                                                        value={formDataCita.fechaDeseada}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        name="fechaDeseada"
                                                        id="fechaDeseada"
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    />
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="tipoAtencion" className="block text-sm font-medium text-sky-700 mb-1">Tipo Atención</label>
                                                    <input
                                                        value={formDataCita.tipoAtencion}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        name="tipoAtencion"
                                                        id="tipoAtencion"
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    />
                                                </div>

                                            </div>
                                            <div className="flex gap-2 flex-col lg:flex-row w-full items-center space-x-1 space-y-2 lg:space-y-0">

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="profesional" className="block text-sm font-medium text-sky-700 mb-1">Profesional</label>
                                                    <input
                                                        type="text"
                                                        name="profesional"
                                                        id="profesional"
                                                        value={formDataCita.profesional}
                                                        onChange={handleInputChange}
                                                        // onKeyDown={handleEnterKeyPress}
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    />
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="paciente" className="block text-sm font-medium text-sky-700 mb-1">Paciente</label>
                                                    <input
                                                        value={formDataCita.paciente}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        name="paciente"
                                                        id="paciente"
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    />
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="nombrePaciente" className="block text-sm font-medium text-sky-700 mb-1">Nombre Paciente</label>
                                                    <input
                                                        value={formDataCita.nombrePaciente}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        name="nombrePaciente"
                                                        id="nombrePaciente"
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    />
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="nota" className="block text-sm font-medium text-sky-700 mb-1">Nota</label>
                                                    <input
                                                        value={formDataCita.nota}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        name="nota"
                                                        id="nota"
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Draggable >
            )}
        </>
    )
}

export default CalendarMeet;