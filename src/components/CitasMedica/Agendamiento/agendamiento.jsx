import React, { useState, useEffect } from "react";
import { BiCalendarWeek } from "react-icons/bi";
import { IoTime } from "react-icons/io5";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './styleCalendar.css'
import CalendarMeet from "../calendarMeet/calendarMeet";

const Agendamiento = () => {

    {/** obtener datos del localStorage y sessionStorage **/ }
    const nxsdb = localStorage.getItem("nxsdbParam")
    const token = sessionStorage.getItem('token');
    const codigo_USR = sessionStorage.getItem('Codigo_USR');

    const [fechaSeleccionada, setFechaSeleccionada] = useState('');
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
        listarHoras(fechaSeleccionadaISO);

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
    const EspecialistasCabecera = async (fechaCalendar) => {

        const formData = new FormData();
        formData.append('nxs_db', nxsdb);
        formData.append('Codigo_USR', codigo_USR);
        formData.append('areas', codigoCheckbox);
        formData.append('fecha', fechaCalendar);
        // console.log(token);

        setIsLoading(true);
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
                setListaCabecera(data.resultados)

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

    {/*** Funcion para listar las horas disponbles en la tabla***/ }
    const listarHoras = async (fechaCalendar) => {

        const formData = new FormData();
        formData.append('nxs_db', nxsdb);
        formData.append('Codigo_USR', codigo_USR);
        formData.append('areas', codigoCheckbox);
        formData.append('fecha', fechaCalendar);
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
                const horas = generarHoras(horamin, horamax);
                setHoras(horas);


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
            <div className="h-full border rounded-md gap-5 m-2 mr-0">
                <div className="w-full h-max bg-sky-700 flex items-center justify-between gap-1 text-white text-md font-semibold rounded-t-md p-3">
                    <div className="flex items-center gap-1">
                        <BiCalendarWeek />
                        <h1 className="">Agendamiento</h1>
                    </div>
                </div>
                <div className="h-full lg:h-[85%] block lg:flex gap-5 p-2">
                    <div className="w-[80%] h-[90%] lg:h-full p-2">
                        <div className="w-full flex items-center justify-center h-max border p-2">
                            <h1> AGENDA DEL DÍA {fechaSeleccionada} </h1>
                        </div>
                        {/**  <CalendarMeet fechaSeleccionada={fechaSeleccionada} /> */}
                        {/** <table></table> */}
                        <div className="w-full h-full overflow-auto relative border sm:rounded-lg">
                            <table className="min-w-full text-sm text-gray-500 text-center">
                                <thead className="text-xs text-gray-100 uppercase bg-sky-700">
                                    <tr>
                                        <th className=""><p className="w-full flex justify-center items-center text-center text-[14px]"><IoTime /></p></th>
                                        {listaCabecera.map((resultado, index) => (
                                            <th key={index} className="border px-4 py-2"><p className="">{resultado.nombre_completo}</p></th>
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
                                                    <td key={index} className="border px-4 py-2">{hora}</td>
                                                    {listaCabecera.map((resultado, index) => (
                                                        <td key={index} className="border px-4 py-2">
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
                    <div className="w-[20%] max-w-[30%] h-max border rounded-md shadow-md p-4">
                        <h1 className="bg-sky-700 text-center text-white text-sm rounded-md rounded-b-none py-1.5 px-2">Seleccione el dia deseado</h1>
                        <Calendar onChange={handleFechaSeleccionada} value={fechaActual} minDate={new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1)} maxDate={fechaMax} />
                        <div className="border rounded-sm mt-4 p-2">
                            <p className="text-sm">Areas</p>
                            {areas.length === 0 ? (
                                <p className="text-sm text-red-500">Sin áreas registradas ...</p>
                            ) : (
                                areas.map((area, index) => (
                                    <div key={index} className="flex items-center mt-2">
                                        <input type="checkbox" id={`area-${index}`} className="form-checkbox h-4 w-4 text-green-500" defaultChecked={true} />
                                        <label htmlFor={`area-${index}`} className="text-sm ml-2">{area.Nombre_ARE}</label>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="tipoAtencion" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Atención</label>
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
            </div>
        </>
    )
}

export default Agendamiento;
