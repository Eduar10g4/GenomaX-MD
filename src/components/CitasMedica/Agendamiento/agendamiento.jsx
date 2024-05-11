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

    // Estado para almacenar el nombre del área seleccionada
    const [areaSeleccionada, setAreaSeleccionada] = useState('');
    const [fechaSeleccionada, setFechaSeleccionada] = useState('');
    const [horaMin, setHoraMin] = useState('');
    const [horaMax, setHoraMax] = useState('');
    const [nombreArea, setNombreArea] = useState('');
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
    const [isOpenServicios, setIsOpenServicios] = useState(false);

    const [seleccionServicios, setSeleccionServicios] = useState('');

    //--- Estados filtro Ingreso ---//
    const [listadoServicios, setListadoServicios] = useState([]);
    const [listadoServiciosOriginal, setListadoServiciosOriginal] = useState([]);
    const [filtroCategoriaServicios, setFiltroCategoriaServicios] = useState('');
    const [filtroServicios, setFiltroServicios] = useState('');
    const [filtroAplicadoServicios, setFiltroAplicadoServicios] = useState(false);
    //--- Fin ---//

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

            const nombreSeleccionado = areas.map(nombre => nombre.Nombre_ARE);
            const nombreTexto = nombreSeleccionado.join(", "); // Concatena los nombres con una coma y un espacio entre ellos
            console.log("Nombre seleccionado:", nombreTexto);

            setNombreArea(nombreTexto);
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

    // const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

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
                                                        handleCellClick(event, horaEnRango, codigoAGE);
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


    const handleCellClick = (event, horaSeleccionada, codigoEspecialista) => {
        setIsOpen(true);

        // Filtrar el arreglo listaCabecera para encontrar el especialista con el código correspondiente
        const especialista = listaCabecera.find(especialista => especialista.Codigo_AGE === codigoEspecialista);

        // Verificar si se encontró el especialista
        if (especialista) {
            console.log("Nombre del especialista:", especialista.nombre_completo);
        } else {
            console.log("No se encontró ningún especialista con el código:", codigoEspecialista);
        }

        setFormDataCita({
            fechaAgenda: fechaSeleccionada,
            horaAgenda: horaSeleccionada,
            fechaDeseada: fechaSeleccionada,
            profesional: especialista.nombre_completo,
            area: nombreArea
        });

        // console.log("Hora seleccionada:", horaSeleccionada);
    };

    useEffect(() => {

        const listarServicios = async () => {

            const formData = new FormData();
            formData.append('nxs_db', nxsdb);
            formData.append('Codigo_USR', codigo_USR);
            // console.log(token);

            setIsLoading(true);
            try {
                const response = await fetch('https://apimd.genomax.app/api/ListarServicios', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Servicios", data);
                    setListadoServicios(data.Servicios);
                    setListadoServiciosOriginal(data.Servicios);


                } else {
                    // Si la respuesta tiene error, mostrar mensaje de error
                    console.log("error")
                }
            } catch (error) {
                // Si hay un error en la solicitud, mostrar mensaje de error
                console.error('Error al enviar la solicitud:', error);
            }
        };

        if (isOpen) {
            listarServicios();
        }

    }, [isOpen])

    const handleRowClickServicios = (idIngreso) => {
        setSeleccionServicios(idIngreso);
    };

    // ----- Funciones Filtro Servicios -----//

    const handleCategoryChangeServicios = (event) => {
        const selectedCategory = event.target.value;
        setFiltroCategoriaServicios(selectedCategory);
        //setFiltroIngreso('')
    };

    const handleFilterChangeServicios = (event) => {
        const inputFiltro = event.target.value;
        setFiltroServicios(inputFiltro);
    };

    const handleKeyPressPacienteServicios = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evitar que se envíe el formulario
            aplicarFiltroServicios();

            // Estado para detectar que se presiono la tecla enter y cambiar el mensaje de la tabla por el resultado del filtro
            setFiltroAplicadoServicios(true);
        }
    };

    const aplicarFiltroServicios = () => {

        if (filtroCategoriaServicios === '' || filtroServicios === '') {
            setListadoServicios(listadoServiciosOriginal); // Restaurar la lista original si no hay filtro seleccionado o filtro vacío
            return;
        }

        const filteredServicios = listadoServiciosOriginal.filter((servicios) =>
            servicios[filtroCategoriaServicios] && servicios[filtroCategoriaServicios].toLowerCase().includes(filtroServicios.toLowerCase())
        );
        setListadoIngresos(filteredServicios);
        // console.log(filteredIngresos)
    };

    // Función para renderizar los eventos en el calendario
    /*  const renderizarEventos = ({ date, view }) => {
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
      };*/

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
                                            <input type="checkbox" id={`area-${area.Codigo_ARE}`} className="form-checkbox h-4 w-4 text-green-500" defaultChecked={true} />
                                            <label htmlFor={`area-${area.Codigo_ARE}`} className="text-sm ml-2 text-white">{area.Nombre_ARE}</label>
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
                    <div className="px-4 hover:bg-gray-300 hover:rounded-sm cursor-pointer" onClick={() => { setMostrarModal(false); setIsOpen(true) }}>
                        <p>Programar nueva cita</p>
                    </div>
                </div>
            )}
            {isOpen && (
                <Draggable cancel=".cancel-drag">
                    <div id="defaultModal" tabindex="-1" aria-hidden="true" className="fixed inset-0 flex flex-col gap-4 items-center justify-center z-50 px-20">
                        <div class="relative  h-max shadow-md">

                            <div class="h-full bg-white rounded-md shadow overflow-y-auto bg-opacity-25 backdrop-filter backdrop-blur-md bg-white bg-opacity-25 shadow-lg rounded-lg border border-gray-100 border-opacity-25">
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
                                    <div className="w-full h-[50%] overflow-y-auto md:h-max bg-opacity-25 backdrop-filter backdrop-blur-md bg-white bg-opacity-85 shadow-lg rounded-lg border border-gray-100 border-opacity-25 p-4 px-5 pr-8">
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
                                                        type="time"
                                                        name="horaAgenda"
                                                        id="horaAgenda"
                                                        value={formDataCita.horaAgenda}
                                                        onChange={handleInputChange}
                                                        // onKeyDown={handleEnterKeyPress}
                                                        className="flex-1 px-2 bg-gray-300 block w-full min-w-0 rounded-md sm:text-sm py-2"
                                                        disabled
                                                    />
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
                                                            onClick={() => setIsOpenServicios(true)}
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
                                                        className="flex-1 px-2 bg-gray-300 block w-full min-w-0 rounded-md sm:text-sm py-2 "
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
                                                        className="flex-1 px-2 bg-gray-300 block w-full min-w-0 rounded-md sm:text-sm py-2 "
                                                        disabled
                                                    />
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="tipoConsulta" className="block text-sm font-medium text-sky-700 mb-1">Tipo Consulta</label>
                                                    <select
                                                        value={formDataCita.tipoConsulta}
                                                        onChange={handleInputChange}
                                                        name="tipoConsulta"
                                                        id="tipoConsulta"
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    >
                                                        <option value="primera-vez">Primera vez</option>
                                                        <option value="control">Control</option>
                                                    </select>
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="fechaDeseada" className="block text-sm font-medium text-sky-700 mb-1">Fecha Deseada</label>
                                                    <input
                                                        value={formDataCita.fechaDeseada}
                                                        onChange={handleInputChange}
                                                        type="date"
                                                        name="fechaDeseada"
                                                        id="fechaDeseada"
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    />
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label htmlFor="tipoAtencion" className="block text-sm font-medium text-sky-700 mb-1">Tipo Atención</label>
                                                    <select
                                                        value={formDataCita.tipoAtencion}
                                                        onChange={handleInputChange}
                                                        name="tipoAtencion"
                                                        id="tipoAtencion"
                                                        className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                                    >
                                                        <option value="presencial">Presencial</option>
                                                        <option value="seguimiento-telefonico">Seguimiento Telefónico o Virtual</option>
                                                        <option value="telesalud">Atención por Telesalud</option>
                                                    </select>
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
                                                        className="flex-1 px-2 bg-gray-300 block w-full min-w-0 rounded-md sm:text-sm py-2 "
                                                        disabled
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
                                                        className="flex-1 px-2 bg-gray-300 block w-full min-w-0 rounded-md sm:text-sm py-2 "
                                                        disabled
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
                                    <button className="bg-sky-700 text-white rounded-md p-1.5 px-3 hover:bg-sky-800">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Draggable >
            )}
            {isOpenServicios && (
                <div>

                    <div id="defaultModal" tabindex="-1" aria-hidden="true" className="fixed inset-0 flex flex-col gap-4 overflow-scroll items-center  py-5 z-50 bg-black bg-opacity-25 backdrop-blur shadow-xl rounded-lg border border-white border-opacity-25">
                        <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">

                            <div class="relative p-4 bg-white rounded-lg shadow sm:p-5">

                                <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                    <h3 class="text-lg font-semibold text-[#729d3b] dark:text-white">
                                        Buscar Ingresos...
                                    </h3>
                                    <button onClick={() => setIsOpenServicios(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>

                                <form onSubmit={(event) => event.preventDefault()}>

                                    <div class="grid gap-4 mb-4 sm:grid-cols-1">

                                        <div className="flex flex-col lg:flex-row w-full gap-3">

                                            <div className="lg:flex-1 w-full">
                                                <select id="category" className="bg-gray-50 text-[#729d3b] border border-gray-300  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleCategoryChangeServicios}>
                                                    <option value="">Seleccione el filtro</option>
                                                    <option value="Codigo_SER">Codigo Servicio</option>
                                                    <option value="Nombre_SER">Nombre</option>
                                                </select>
                                            </div>

                                            <div className="lg:flex-1 w-full">
                                                <input type="text" value={filtroServicios} onChange={handleFilterChangeServicios} onKeyPress={handleKeyPressPacienteServicios} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" />
                                            </div>

                                        </div>

                                        <div class="sm:col-span-2 overflow-hidden ">
                                            <label for="description" class="block mb-2 text-sm font-medium text-[#729d3b] dark:text-white">Resultado de Busqueda</label>

                                            <div className="h-[200px]  overflow-x-auto  relative border sm:rounded-lg">
                                                <table className="min-w-[1024px]  lg:w-full text-sm  text-gray-500 text-center">
                                                    <thead className="text-xs text-gray-100 uppercase bg-[#729d3b]">
                                                        <tr>
                                                            <th scope="col" className="py-3 px-2">
                                                               <p className="w-max"> Codigo Servicio</p>
                                                            </th>
                                                            <th scope="col" className="py-3 px-2">
                                                                Nombre
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filtroAplicadoServicios === false ? (
                                                            <td >No hay resultados para mostrar.</td>
                                                        ) : (
                                                            <>
                                                                {listadoServicios.map((item) => (
                                                                    <tr key={item.Codigo_SER} className="bg-white border-b hover:bg-gray-50 cursor-pointer">
                                                                        <td className="py-2.5 px-2 text-xs text-center mr-5">
                                                                            {item.Codigo_SER}
                                                                        </td>
                                                                        <td className="py-2.5 px-2 text-xs text-left">
                                                                            {item.Nombre_SER}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </>
                                                        )}
                                                    </tbody>

                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row w-full justify-between ">
                                        <div>
                                            <label for="seleccion" className="block text-sm font-medium text-[#729d3b]">Seleccion</label>
                                            <input type="number" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" disabled />
                                        </div>
                                        <button className="text-white h-12 mt-3  items-center bg-[#729d3b] flex justify-center lg:justify-end  hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                            Seleccionar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Agendamiento;
