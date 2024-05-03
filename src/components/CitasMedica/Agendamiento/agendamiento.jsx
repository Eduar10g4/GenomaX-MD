import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { BiCalendarWeek } from "react-icons/bi";
import { IoTime } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { FaWpforms, FaSearch } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import fondo from "../../../assets/img/fondo.png"
import Calendar from "react-calendar";
import Draggable from "react-draggable";
import 'react-calendar/dist/Calendar.css';
import './styleCalendar.css'
import CalendarMeet from "../calendarMeet/calendarMeet";

const Agendamiento = () => {

    {/** obtener datos del localStorage y sessionStorage **/ }
    const nxsdb = localStorage.getItem("nxsdbParam")
    const token = sessionStorage.getItem('token');
    const codigo_USR = sessionStorage.getItem('Codigo_USR');

    const [fechaSeleccionada, setFechaSeleccionada] = useState('');
    const [horaMin, setHoraMin] = useState('');
    const [horaMax, setHoraMax] = useState('');
    const [fechaActual, setFechaActual] = useState(new Date());
    const [fechaMax, setFechaMax] = useState(new Date());
    const [areas, setAreas] = useState([]);
    const [tipoAtencion, setTipoAtencion] = useState([]);
    const [codigos, setCodigos] = useState([]);
    const [numeros, setNumeros] = useState([]);
    const [codigoCheckbox, setCodigoCheckbox] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [listaCabecera, setListaCabecera] = useState([]);
    const [horas, setHoras] = useState([]);
    const [codigosAGE, setCodigosAGE] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarIcono, setMostrarIcono] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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


    // Llamar a la función para generar los números cuando el componente se monta
    useEffect(() => {
        const nuevosNumeros = [];
        for (let i = 1; i <= 20; i++) {
            nuevosNumeros.push({ numero: i });
        }
        setNumeros(nuevosNumeros);
    }, []);

    {/*** funcion para obtener la fecha actual ***/ }
    useEffect(() => {
        const fechaActualISO = new Date().toISOString().split('T')[0];
        setFechaSeleccionada(fechaActualISO);
    }, []);

    {/*** Funcion para obtener la fecha seleccionada en el calendario ***/ }
    const handleFechaSeleccionada = (date) => {
        const fechaSeleccionadaISO = date.toISOString().split('T')[0];
        console.log('fecha seleccionada', fechaSeleccionadaISO);
        setFechaSeleccionada(fechaSeleccionadaISO);
        EspecialistasCabecera(fechaSeleccionadaISO);
        // horasDisponiblesAge(fechaSeleccionadaISO);

        /*   const year = date.getFullYear();
           const month = ("0" + (date.getMonth() + 1)).slice(-2); // Agrega cero inicial si el mes es menor que 10
           const day = ("0" + date.getDate()).slice(-2); // Agrega cero inicial si el día es menor que 10
   
           console.log("Año:", year);
           console.log("Mes:", month);
           console.log("Día:", day);*/

        // Codigos(year, month, day);
    }

    {/*** Funcion que devuelve la fecha maxima de la agenda ***/ }
    useEffect(() => {
        const handleFechaMax = async () => {

            const formData = new FormData();
            formData.append('nxs_db', nxsdb);
            formData.append('Codigo_USR', codigo_USR);
            //  setLoading(true);
            // console.log(token);

            try {
                const response = await fetch('https://apimd.genomax.app/api/ListarFechaMax', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.fechaMaxima);
                    setFechaMax(new Date(data.fechaMaxima)); // Convertir la fecha máxima a objeto Date

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

        handleFechaMax();
    }, [])

    {/*** Funcion que devuelve las areas ***/ }
    useEffect(() => {
        const Areas = async () => {

            const formData = new FormData();
            formData.append('nxs_db', nxsdb);
            formData.append('Codigo_USR', "1");
            //  setLoading(true);
            // console.log(token);

            try {
                const response = await fetch('https://apimd.genomax.app/api/ObtenerAreaUsuario', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setAreas(data.areas);

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

        Areas();
    }, [])

    {/*** Fncion para obtener el codigo de los checks de las areas apenas se monte el componente ***/ }
    useEffect(() => {
        const obtenerCodigosSeleccionados = () => {
            const codigosSeleccionados = areas.map(area => area.Codigo_ARE);
            console.log("Códigos seleccionados:", codigosSeleccionados);
            setCodigoCheckbox(codigosSeleccionados);
            // Aquí puedes hacer cualquier otra acción con los códigos seleccionados
        };

        obtenerCodigosSeleccionados();
    }, [areas]);


    {/*** Funcion que devuelve los tipo de atencion en el select ***/ }
    useEffect(() => {
        const tipoAtencion = async () => {

            const formData = new FormData();
            formData.append('nxs_db', nxsdb);
            formData.append('Codigo_USR', "1");
            //  setLoading(true);
            // console.log(token);

            try {
                const response = await fetch('https://apimd.genomax.app/api/ShowTipoAtencion', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setTipoAtencion(data.CamposSelect);

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

        tipoAtencion();
    }, [])

    {/*** Funcion para obtener los codigos de las agendas  ***/ }
    const Codigos = async (year, month, day) => {

        const formData = new FormData();
        formData.append('nxs_db', nxsdb);
        formData.append('Codigo_USR', codigo_USR);
        formData.append('year', year);
        formData.append('month', month);
        formData.append('day', day);
        //  setLoading(true);
        // console.log(token);

        try {
            const response = await fetch('https://apimd.genomax.app/api/obtenerCodigosPorFecha', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setCodigos(data.codigos);

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

    {/*** Funcion para mostrarme el numero de citas que hay por dia  ***/ }
    const AgendasDisponibles = async (year, month, day) => {

        const formData = new FormData();
        formData.append('nxs_db', nxsdb);
        formData.append('Codigo_USR', codigo_USR);
        formData.append('year', year);
        formData.append('month', month);
        formData.append('day', day);
        formData.append('codigos', codigos)
        //  setLoading(true);
        // console.log(token);

        try {
            const response = await fetch('https://apimd.genomax.app/api/contarPorCodigoYFecha', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);

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

    {/*** Funcion para obtener los profesionales disponibles segun la fecha ***/ }
    useEffect(() => {

        const EspecialistasCabecera = async () => {

            const formData = new FormData();
            formData.append('nxs_db', nxsdb);
            formData.append('Codigo_USR', codigo_USR);
            formData.append('areas', codigoCheckbox);
            formData.append('fecha', fechaSeleccionada);
            // console.log(token);

            // setIsLoading(true);
            try {
                const response = await fetch('https://apimd.genomax.app/api/ListarEspecialistasCabecera', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    console.log("Todos los Codigo_AGE:", data.resultados.map(resultado => resultado.Codigo_AGE));
                    const codigoAge = data.resultados.map(resultado => resultado.Codigo_AGE);
                    setCodigosAGE(codigoAge);
                    // horasDisponiblesAge(codigoAge);
                    setListaCabecera(data.resultados)
                    // listarHoras(fechaCalendar);

                } else {
                    // Si la respuesta tiene error, mostrar mensaje de error
                    console.log("error")
                }
            } catch (error) {
                // Si hay un error en la solicitud, mostrar mensaje de error
                console.error('Error al enviar la solicitud:', error);
            }
        };
        if (fechaSeleccionada && codigoCheckbox) {
            EspecialistasCabecera();
        }
    }, [fechaSeleccionada, codigoCheckbox])

    {/*** Funcion para listar las horas disponbles en la tabla***/ }
    useEffect(() => {

        const listarHoras = async () => {

            const formData = new FormData();
            formData.append('nxs_db', nxsdb);
            formData.append('Codigo_USR', codigo_USR);
            formData.append('areas', codigoCheckbox);
            formData.append('fecha', fechaSeleccionada);
            // console.log(token);

            setIsLoading(true);
            try {
                const response = await fetch('https://apimd.genomax.app/api/ListarhoraSchedule', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    const { horamax, horamin } = data;
                    console.log("horamax", horamax);
                    console.log("horamin", horamin);
                    setHoraMin(horamin);
                    setHoraMax(horamax);
                    //  horasDisponiblesAge(fechaCalendar, horamin, horamax);
                    const horas = generarHoras(horamin, horamax);
                    setHoras(horas);
                    console.log(horas);


                } else {
                    // Si la respuesta tiene error, mostrar mensaje de error
                    console.log("error")
                }
            } catch (error) {
                // Si hay un error en la solicitud, mostrar mensaje de error
                console.error('Error al enviar la solicitud:', error);
            } finally {
                setIsLoading(false);
            }
        };
        if (fechaSeleccionada && codigoCheckbox) {
            listarHoras();
        }
    }, [fechaSeleccionada, codigoCheckbox])


    // Función para generar el rango de horas con intervalos de 5 minutos

    const generarHoras = (horaInicio, horaFin) => {
        const horas = [];
        let horaActual = horaInicio;
        while (horaActual <= horaFin) {
            const horaFormateada = sumarMinutos(horaActual, 0); // Asegurar que todas las horas tengan el mismo formato
            horas.push(horaFormateada);
            horaActual = sumarMinutos(horaActual, 5);
        }
        return horas;
    };

    // Función para sumar minutos a una hora en formato HH:mm:ss
    const sumarMinutos = (hora, minutos) => {
        const partes = hora.split(":");
        const horaActual = new Date(0, 0, 0, partes[0], partes[1]);
        horaActual.setMinutes(horaActual.getMinutes() + minutos);
        return horaActual.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };

    const toggleModal = () => {
        setMostrarModal(!mostrarModal)
    }

    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    const handleCellClick = (event) => {
        const cell = event.target.closest('td');
        if (cell) {
            const cellRect = cell.getBoundingClientRect();
            setModalPosition({
                top: cellRect.top - 10, // Ajusta según sea necesario
                left: cellRect.left - 10, // Ajusta según sea necesario
            });
            setMostrarModal(true);
        }
        console.log("habla")
    };

    {/*** Funcion para listar las horas disponbles en la tabla***/ }
    useEffect(() => {
        const horasDisponiblesAge = async () => {

            const formData = new FormData();
            formData.append('nxs_db', nxsdb);
            formData.append('Codigo_USR', codigo_USR);
            formData.append('areas', codigoCheckbox);
            formData.append('fecha', fechaSeleccionada);
            formData.append('horamin', horaMin);
            formData.append('horamax', horaMax);

            // Convertir los códigos de AGE a un array
            formData.append('agendas', JSON.stringify(codigosAGE));
            // console.log(token);

            // setIsLoading(true);
            try {
                const response = await fetch('https://apimd.genomax.app/api/obtenerHorasAgenda', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);

                    // Función para formatear la hora sin segundos
                    const formatearHora = (hora) => {
                        if (hora) { // Verificar si la hora no es undefined
                            // Dividir la hora en partes (hora, minutos, segundos)
                            const partes = hora.split(":");
                            // Tomar solo la hora y los minutos
                            const horaFormateada = `${partes[0]}:${partes[1]}`;
                            return horaFormateada;
                        } else {
                            return ""; // O cualquier valor predeterminado que desees en caso de que la hora sea undefined
                        }
                    };

                    if (data && data.length > 0) {
                        const horasConIcono = {}; // Objeto para almacenar las horas con icono

                        for (let i = 0; i < data.length; i++) {
                            const tiempo = parseInt(data[i].tiempo); // Convertir tiempo a entero
                            const detalles = data[i].detalles;
                            if (detalles && detalles.length > 0) {
                                for (let j = 0; j < detalles.length; j++) {
                                    const codigoAGE = detalles[j].Codigo_AGE;
                                    const horaAGE = detalles[j].Hora_AGE;
                                    const estadoAGE = detalles[j].Estado_AGE;
                                    let horaFormateada = formatearHora(horaAGE);

                                    // Calcular la hora final sumando el tiempo al inicio
                                    const [horaInicio, minInicio] = horaFormateada.split(":").map(Number);
                                    let horaFinal = horaInicio * 60 + minInicio + tiempo;
                                    const horaFinalFormato = `${Math.floor(horaFinal / 60).toString().padStart(2, "0")}:${(horaFinal % 60).toString().padStart(2, "0")}`;

                                    // Obtener todas las horas dentro del rango entre horaFormateada y horaFinalFormato
                                    const horasEnRango = horas.filter(hora => hora >= horaFormateada && hora < horaFinalFormato);
                                    //Imprimer la hora de inicio y la final
                                    console.log("horaInicio", horaFormateada);

                                    // Imprimir todas las horas en el rango
                                    //   console.log("Horas en el rango:", horasEnRango.join(", "));
                                    // Aplicar clases a las celdas según el rango de tiempo
                                    for (const horaEnRango of horasEnRango) {
                                        const cellId = `hora-${horaEnRango}-especialista-${codigoAGE}`;
                                        const cell = document.getElementById(cellId);
                                        console.log(cell)
                                        if (cell) {
                                            if (estadoAGE === "1") {
                                                cell.classList.add("bg-gray-400");
                                            } else if (estadoAGE === "0") {
                                                cell.classList.add("bg-blue-500", "border-none", "cursor-pointer");
                                                // Agregar evento onClick para mostrar el mensaje
                                                cell.addEventListener("click", (event) => {
                                                    if (horaEnRango === horaFormateada) {
                                                        handleCellClick(event);
                                                    }

                                                });

                                                // console.log("mensaje modal", mostrarModal)

                                                // Verificar si ya se ha agregado el icono en esta hora
                                                /* if (!horasConIcono[horaFormateada]) {
                                                     if (horaEnRango === horaFormateada) {
                                                         const icon = document.createElement("span");
                                                         createRoot(icon).render(<IoIosAdd className="text-lg text-white" />);
                                                         cell.appendChild(icon);
                                                         // Marcar la hora actual como que ya se ha agregado el icono
                                                         // setIconosAgregados(true);
                                                     }
                                                 }*/
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                } else {
                    // Si la respuesta tiene error, mostrar mensaje de error
                    console.log("error")
                }
            } catch (error) {
                // Si hay un error en la solicitud, mostrar mensaje de error
                console.error('Error al enviar la solicitud:', error);
            } /*finally {
                setIsLoading(false);
            }*/
        };

        if (codigosAGE && horaMin && horaMax) {
            horasDisponiblesAge();
        }

    }, [codigosAGE, horaMin, horaMax])

    /*  const renderDayContent = (date) => {
          const dia = date.getDate();
          if (numeros.includes(dia)) {
              return (
                  <div className="relative bg-emerald-500">
                  <p>{dia}</p>
                  {numeroDia && (
                      <div className="bg-emerald-500 top-10 bottom-0 left-0 bg-white shadow-md rounded-md p-2">
                          <p className="text-sm">{numeroDia}</p>
                      </div>
                  )}
              </div>
              );
          }
          return dia;
      };*/

    // Función para renderizar los eventos en el calendario
    const renderizarEventos = ({ date, view }) => {
        if (view === 'month') {
            const dia = date.getDate();
            if (numeros.includes(dia)) {
                return (
                    <div className="relative bg-emerald-500">
                        <p className="bg-red-500">{dia}</p>
                        {numeroDia && (
                            <div className="bg-emerald-500 top-10 bottom-0 left-0 bg-white shadow-md rounded-md p-2">
                                <p className="text-sm">{numeroDia}</p>
                            </div>
                        )}
                    </div>
                );
            }
            return dia;
        }
    };

    return (
        <>
            <div className="h-full rounded-md gap-5 m-2" style={{ backgroundImage: `url(${fondo})` }}>
                <div className="w-full h-max flex items-center justify-between gap-1 text-white text-md font-semibold rounded-md p-3" style={{
                    background: "rgba(255, 255, 255, 0.25)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    WebkitBackdropFilter: "blur(9.5px)",
                    backdropFilter: "blur(9.5px)",
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 255, 255, 0.18)"
                }}>
                    <div className="flex items-center text-lg gap-1">
                        <BiCalendarWeek />
                        <h1 className="">Agendamiento</h1>
                    </div>
                </div>
                <div className="h-full w-full overflow-y-auto block lg:flex gap-2 pt-2">
                    <div className="w-full lg:max-w-[320px] h-max border rounded-md shadow-md p-4 mb-2 lg:mb-0" style={{
                        background: "rgba(255, 255, 255, 0.25)",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                        WebkitBackdropFilter: "blur(9.5px)",
                        backdropFilter: "blur(9.5px)",
                        borderRadius: "10px",
                        border: "1px solid rgba(255, 255, 255, 0.18)"
                    }}>
                        <h1 className="bg-sky-700 text-center text-white text-sm rounded-md rounded-b-none py-1.5 px-2">Seleccione el dia deseado</h1>
                        <Calendar onChange={handleFechaSeleccionada} value={fechaActual} minDate={new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1)} maxDate={fechaMax} />
                        <div className="bg-opacity-25 backdrop-filter backdrop-blur-md bg-white bg-opacity-25 shadow-lg rounded-lg border border-gray-100 border-opacity-25 p-2 mt-4">
                            <div className="" >
                                <p className="text-sm text-white font-semibold">Areas</p>
                                {areas.length === 0 ? (
                                    <p className="text-sm text-red-500">Sin áreas registradas ...</p>
                                ) : (
                                    areas.map((area, index) => (
                                        <div key={index} className="flex items-center mt-2">
                                            <input type="checkbox" id={`area-${index}`} className="form-checkbox h-4 w-4 text-green-500" defaultChecked={true} />
                                            <label htmlFor={`area-${index}`} className="text-sm ml-2 text-white">{area.Nombre_ARE}</label>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="mt-4">
                                <label htmlFor="tipoAtencion" className="block text-sm text-white font-medium text-gray-700 mb-1">Tipo de Atención</label>
                                <select
                                    id="tipoAtencion"
                                    name="tipoAtencion"
                                    //  value={value}
                                    // onChange={onChange}
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    {tipoAtencion.length === 0 ? (
                                        <option value="">Sin datos ...</option>
                                    ) : (
                                        tipoAtencion.map((campo, index) => (
                                            <option key={index} value={campo.Codigo_TAH}>{campo.Nombre_TAH}</option>
                                        ))
                                    )}
                                </select>
                                {/**  {numeros.map((objeto, index) => (
                                <p key={index}>{objeto.numero}</p>
                            ))}  */}
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-[75%] h-full overflow-x-auto">
                        <div className="w-full h-max flex items-center justify-center border p-2 bg-opacity-25 backdrop-filter backdrop-blur-md bg-white shadow-lg rounded-lg border border-gray-100 border-opacity-25 mb-2">
                            <h1 className="text-white"> AGENDA DEL DÍA {fechaSeleccionada} </h1>
                        </div>
                        {/**  <CalendarMeet />  */}
                        {/** <table></table> */}
                        <div className="w-full h-max overflow-auto relative sm:rounded-lg bg-opacity-25 backdrop-filter backdrop-blur-md bg-white bg-opacity-25 shadow-lg rounded-lg border border-gray-100 border-opacity-25">
                            <table className="min-w-full text-sm text-gray-500 text-center">
                                <thead className="text-xs text-gray-100 uppercase bg-sky-700">
                                    <tr>
                                        <th className=""><p className="w-full flex justify-center items-center text-center text-[14px]"><IoTime /></p></th>
                                        {listaCabecera.map((resultado, index) => (
                                            <th key={index} id={`especialista-${resultado.Codigo_AGE}`} className="border px-4 py-2"><p className="text-[11px]">{resultado.nombre_completo}</p></th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={6} className='text-center py-2.5 px-2'>Cargando...</td>
                                        </tr>
                                    ) : (
                                        <>
                                            {horas.map((hora, index) => (
                                                <tr key={index}>
                                                    <td key={index} className="border px-1 py-0.5 text-[12px] text-white">{hora}</td>
                                                    {listaCabecera.map((resultado, idx) => (
                                                        <td key={idx} id={`hora-${hora}-especialista-${resultado.Codigo_AGE}`} className="border px-4 py-2 cursor-not-allowed">
                                                            {/* Aquí puedes mostrar cualquier contenido relacionado con el nombre */}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {mostrarModal && (
                <div id="modal" className="absolute bg-white border rounded-md" style={{ top: modalPosition.top, left: modalPosition.left }}>
                    <div className="flex justify-end">
                        <button onClick={() => setMostrarModal(false)} type="button" className="bg-transparent mb-1 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center relative top-1 right-1 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="px-4 hover:bg-gray-300 hover:rounded-sm cursor-pointer" onClick={() => {setMostrarModal(false); setIsOpen(true)}}>
                        <p>Programar nueva cita</p>
                    </div>
                </div>
            )}
            {isOpen && (
                <Draggable cancel=".cancel-drag">
                    <div id="defaultModal" tabindex="-1" aria-hidden="true" className="fixed inset-0 flex flex-col gap-4 items-center justify-center z-50 px-20">
                        <div class="relative  h-max shadow-md">

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
                                <div className="cancel-drag p-5 pb-2">
                                    <div className="bg-gray-100 w-full h-[50%] overflow-y-auto md:h-max shadow-gray-400 border-[1px] p-4 px-5 pr-8 rounded-lg shadow-md">
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
                                                    <select
                                                        value={formDataCita.horaAgenda}
                                                        onChange={handleInputChange}
                                                        name="horaAgenda"
                                                        id="horaAgenda"
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2"
                                                    >
                                                        {/* Aquí puedes agregar las opciones del select */}
                                                        <option value="8:00">8:00 AM</option>
                                                        <option value="9:00">9:00 AM</option>
                                                        <option value="10:00">10:00 AM</option>
                                                        {/* Agrega más opciones según sea necesario */}
                                                    </select>
                                                </div>


                                                <div className="flex-1 w-full">
                                                    <label htmlFor="servicio" className="block text-sm font-medium text-sky-700 mb-1">Servicio</label>
                                                    <div className="mt-1 flex rounded-md shadow-sm">
                                                        <input
                                                            value={formDataCita.servicio}
                                                            onChange={handleInputChange}
                                                            type="text"
                                                            name="servicio"
                                                            id="servicio"
                                                            className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                        />
                                                        <button
                                                            type="button"
                                                            //onClick={toggleModalFiltroIngreso}
                                                            className="-ml-px shadow-md bg-sky-700 text-teal-50 relative inline-flex items-center space-x-2 px-4 py-2 border border-sky-700 text-sm font-medium rounded-r-md  hover:bg-sky-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        >
                                                            <FaSearch />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="nombreServicio" className="block text-sm font-medium text-sky-700 mb-1">Nombre Servicio</label>
                                                    <input
                                                        value={formDataCita.nombreServicio}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        name="nombreServicio"
                                                        id="nombreServicio"
                                                        className="flex-1 px-2 bg-gray-300 block w-max min-w-0 rounded-md sm:text-sm py-2 "
                                                        disabled
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
                                                    <div className="flex rounded-md shadow-sm">
                                                        <button type="button" className="-ml-px shadow-md bg-sky-700 text-teal-50 relative inline-flex items-center space-x-2 px-4 py-2 border border-sky-700 text-sm font-medium rounded-l-md  hover:bg-emerald-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                                            <MdPeopleAlt />
                                                        </button>
                                                        <input
                                                            value={formDataCita.paciente}
                                                            onChange={handleInputChange}
                                                            type="text"
                                                            name="paciente"
                                                            id="paciente"
                                                            className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                        />
                                                        <button type="button" className="-ml-px shadow-md bg-sky-700 text-teal-50 relative inline-flex items-center space-x-2 px-4 py-2 border border-sky-700 text-sm font-medium rounded-r-md  hover:bg-emerald-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                                            <FaSearch />
                                                        </button>
                                                    </div>
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
                                <div className="flex items-center justify-end p-2 pb-4 pr-4">
                                    <button className="bg-sky-700 text-white rounded-md p-2 px-3 hover:bg-sky-800">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Draggable >
            )}
        </>
    )
}

export default Agendamiento;
