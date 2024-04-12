import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { BiCalendarWeek } from "react-icons/bi";
import 'react-calendar/dist/Calendar.css';
import './styleCalendar.css'


const CalendarMd = () => {

    const nxsdb = localStorage.getItem("nxsdbParam")
    //console.log("Base de datos", nxsdb);
    const [codigo_USR, setCodigo_USR] = useState('');
    const [token, setToken] = useState('');
    const [specialties, setSpecialties] = useState([]);
    const [nameSpecialities, setNameSpecialities] = useState('')
    const [loading, setLoading] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [doctorSpecialities, setDoctorSpecialities] = useState([]);
    const [fechasDisponibles, setFechasDisponibles] = useState([]);
    const [horasOcupadas, setHorasOcupadas] = useState([]);
    const [listadoHoras, setListadoHoras] = useState([]);
    const [codigoAge, setCodigoAge] = useState('');
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

    {/** useEffect para Obtener los valores de token y codigo Usuario **/ }
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const activoUSR = sessionStorage.getItem('Activo_USR');
        setToken(token);
        setCodigo_USR(activoUSR);

    }, [])

    {/*** Funciones para especialidades ***/ }

    {/** Endpoint que me lista todas las especialidades **/ }
    const handleSpecialties = async () => {

        // console.log(nxsdb);

        const formData = new FormData();
        formData.append('nxs_db', nxsdb);
        formData.append('Codigo_USR', codigo_USR);

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
                //console.log('Consumo Exitoso')

            } else {
                // Si la respuesta tiene error, mostrar mensaje de error
                console.log("error")
            }
        } catch (error) {
            // Si hay un error en la solicitud, mostrar mensaje de error
            console.error('Error al enviar la solicitud:', error);
        } finally {
            setLoading(false);
        }
    };

    {/** Funcion para capturar el codigo de la especialidad **/ }
    const handleSpecialtyClick = (codigoEsp, nombreEspecialidad) => {
        setSelectedSpecialty(codigoEsp);
        // console.log(codigoEsp);
        handleDoctor(codigoEsp);
        setNameSpecialities(nombreEspecialidad);
    };

    {/** Funcion para retrasar el cierre del modal y poder capturar el codigo_ESP **/ }
    const handleDiley = () => {
        setTimeout(() => {
            setInputFocused(false); // Cierra el modal después de 200 milisegundos
        }, 200); // Ajusta el tiempo según tus necesidades
    }

    {/*** Fin ***/ }

    {/*** Funcion para obtener las horas fachas disponibles en el calendario ***/ }
    const handleDoctor = async (codigoEsp) => {

        const formData = new FormData();
        formData.append('nxs_db', nxsdb);
        formData.append('Codigo_USR', codigo_USR);
        formData.append('Codigo_ESP', codigoEsp);

        //  setLoading(true);
        // console.log(token);

        try {
            const response = await fetch('https://apimd.genomax.app/api/showDoctorsSpecialties', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.DoctorsData);
                setDoctorSpecialities(data.DoctorsData);

            } else {
                // Si la respuesta tiene error, mostrar mensaje de error
                console.log("error")
            }
        } catch (error) {
            // Si hay un error en la solicitud, mostrar mensaje de error
            console.error('Error al enviar la solicitud:', error);
        } /* finally {
            setLoading(false);
        } */
    };

    const handleDoctorChange = (codigoTER) => {
        console.log("Código TER del doctor seleccionado:", codigoTER);
        // Puedes guardar el código en el estado o hacer cualquier otra cosa con él
        handleDiary(codigoTER);
    };

    const handleDiary = async (codigo_TER) => {

        const formData = new FormData();
        formData.append('nxs_db', nxsdb);
        formData.append('Codigo_USR', codigo_USR);
        formData.append('Codigo_ESP', selectedSpecialty);
        formData.append('Codigo_TER', codigo_TER);

        //  setLoading(true);
        // console.log(token);

        try {
            const response = await fetch('https://apimd.genomax.app/api/ShowDiary', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);

                // Extraer las fechas de los datos y agregarlas al array de fechas bloqueadas
                const fechasDisponibles = data.gxagendacab.map(cita => ({
                    startDate: new Date(cita.FechaIni_AGE),
                    endDate: new Date(cita.FechaFin_AGE),
                    Codigo_AGE: cita.Codigo_AGE
                }));
                setFechasDisponibles(fechasDisponibles);
                console.log(fechasDisponibles)

                /* Capturar el valor de Codigo_AGE de la primera cita en data.gxagendacab
                const codigoAge = data.gxagendacab[0].Codigo_AGE;
                setCodigoAge(codigoAge);
                 console.log("Codigo_AGE:", codigoAge);*/

            } else {
                // Si la respuesta tiene error, mostrar mensaje de error
                console.log("error")
            }
        } catch (error) {
            // Si hay un error en la solicitud, mostrar mensaje de error
            console.error('Error al enviar la solicitud:', error);
        } /* finally {
            setLoading(false);
        } */
    };

    //desahabilitar las fechas que no esten en la agenda
    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            return !fechasDisponibles.some(cita => date >= cita.startDate && date <= cita.endDate);
        }
        return false; // Habilita todas las fechas en otras vistas
    };

    // Función para manejar el cambio de fecha seleccionada
    const handleFechaSeleccionada = (date) => {
        // Actualizar el estado con la fecha seleccionada
        setFechaSeleccionada(date);
        // console.log("fecha seleccionada normal", date);
        // Convertir la fecha seleccionada a formato ISO yyyy-mm-dd
        const fechaSeleccionadaISO = date.toISOString().split('T')[0];
        console.log("fecha seleccionada formato ISO", fechaSeleccionadaISO)

        // Convertir las fechas disponibles al formato ISO yyyy-mm-dd
        const fechasDisponiblesISO = fechasDisponibles.map(cita => ({
            startDate: cita.startDate.toISOString().split('T')[0],
            endDate: cita.endDate.toISOString().split('T')[0],
            Codigo_AGE: cita.Codigo_AGE // Agregar la propiedad Codigo_AGE al objeto
        }));
        console.log("fechasDisponibles:", fechasDisponibles);

        // Buscar el Codigo_AGE correspondiente a la fecha seleccionada
        const citaEncontrada = fechasDisponiblesISO.find(cita => fechaSeleccionadaISO >= cita.startDate && fechaSeleccionadaISO <= cita.endDate);
        if (citaEncontrada) {
            console.log("Codigo_AGE correspondiente:", citaEncontrada.Codigo_AGE);
            showHours(citaEncontrada.Codigo_AGE);
        } else {
            console.log("No se encontró ninguna cita para la fecha seleccionada.");
        }

        console.log("listado de horas del enpoint", horasOcupadas)

        // Convertir el formato de las horas en data.Horas al formato de horasDiarias
        const horasOcupadasFormatted = horasOcupadas.map(hora => {
            const [hour, minute, _] = hora.Hora_AGE.split(':');
            return `${hour}:${minute}`;
        });

        console.log("horas formateadas", horasOcupadasFormatted)


        // Obtener todas las horas ocupadas para la fecha seleccionada
        const horasOcupadasParaFechaSeleccionada = horasOcupadasFormatted.filter(hora => hora.Fecha_AGE === fechaSeleccionadaISO).map(hora => hora.Hora_AGE);

        console.log("horas ocupadas", horasOcupadasParaFechaSeleccionada)
        // 2. Crear un conjunto de todas las horas ocupadas
        const horasOcupadasSet = new Set(horasOcupadasParaFechaSeleccionada);

        // 3. Filtrar el arreglo de horas diarias para eliminar las horas ocupadas
        const horasDisponibles = horasDiarias.filter(hora => !horasOcupadasSet.has(hora));

        setListadoHoras(horasDisponibles);

        console.log("Horas disponibles:", horasDisponibles);

    };

    const showHours = async (codigoAge) => {
        const formData = new FormData();
        formData.append('nxs_db', nxsdb);
        formData.append('Codigo_USR', codigo_USR);
        formData.append('Codigo_ESP', selectedSpecialty);
        formData.append('Codigo_AGE', codigoAge);

        //  setLoading(true);
        // console.log(token);

        try {
            const response = await fetch('https://apimd.genomax.app/api/showHours', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
              //  console.log(data);
                setHorasOcupadas(data.Horas)


            } else {
                // Si la respuesta tiene error, mostrar mensaje de error
                console.log("error")
            }
        } catch (error) {
            // Si hay un error en la solicitud, mostrar mensaje de error
            console.error('Error al enviar la solicitud:', error);
        }
    };

    // Definir el rango de horas diarias (por ejemplo, de 0:00 a 23:45)
    const horasDiarias = [];
    for (let hora = 0; hora < 24; hora++) {
        for (let minuto = 0; minuto < 60; minuto += 15) {
            const horaFormateada = `${hora < 10 ? '0' : ''}${hora}:${minuto === 0 ? '00' : minuto}`;
            horasDiarias.push(horaFormateada);
        }
    }

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
                            <input type="text" value={nameSpecialities} onChange={(e) => setNameSpecialities(e.target.value)} className="w-full text-sm text-gray-700 shadow-sm border-2 rounded-md focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500 p-2" placeholder="Buscar la especialidad ..." onFocus={() => { handleSpecialties(); setInputFocused(true); }} onBlur={handleDiley} />

                            {inputFocused && !loading && specialties.length > 0 && (
                                <div className="w-full h-44 absolute z-50 top-16 bg-white border shadow-md rounded-md overflow-y-auto">
                                    {specialties.map(specialty => (
                                        <div key={specialty.Codigo_ESP}>
                                            <h3 className="text-[13px] cursor-pointer hover:bg-gray-300 p-2 py-1.5" onClick={() => { handleSpecialtyClick(specialty.Codigo_ESP, specialty.Nombre_ESP) }}>{specialty.Nombre_ESP}</h3>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {loading && (
                                <div className="w-full h-max absolute top-16 bg-white border rounded -md shadow-md p-2">
                                    <p>Cargando especialidades...</p>
                                </div>
                            )}

                        </div>
                        <div className="w-[50%] flex flex-col">
                            <label htmlFor="">Doctor</label>
                            <select name="doctor" id="doctor" onChange={(e) => handleDoctorChange(e.target.value)} className="w-full text-sm text-gray-700 shadow-sm border-2 rounded-md focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500 p-2">
                                <option value="" className="" >Selecciona un doctor...</option>
                                {doctorSpecialities.map((doctor, index) => (
                                    <option key={index} value={doctor.Codigo_TER}>
                                        {`${doctor.Nombre1_MED} ${doctor.Nombre2_MED} ${doctor.Apellido1_MED} ${doctor.Apellido2_MED}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Calendar onChange={handleFechaSeleccionada} tileDisabled={tileDisabled} />
                    </div>
                    <div className="w-full pt-2">
                        <h2>Horas Disponibles</h2>
                        <div className="flex flex-wrap gap-1">
                            {/* Mapear todas las horas diarias y mostrarlas en botones */}
                            {listadoHoras.map((hora, index) => (
                                <button className="text-gray-100 bg-blue-500 border shadow-md rounded-md p-1 px-2" key={index} onClick={() => handleHoraClick(hora)}>
                                    {hora}
                                </button>
                            ))}
                        </div>
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