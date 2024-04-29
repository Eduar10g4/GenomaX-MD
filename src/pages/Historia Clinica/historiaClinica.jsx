import React, { useState, useEffect } from "react";
import { MdPeopleAlt } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import PacienteHc from "./formularioPaciente";

const HistoriaClinica = () => {

  // Datos HC
  const [formDataHc, setFormDataHc] = useState({
    paciente: '',
    nombre: '',
    areaServicio: '',
    hora: '',
    ingreso: '',
    tipoAtencion: '',
    contrato: '',
    plan: '',
    rango: '',
    fechaNaciemiento: '',
    edad: '',
    sexo: '',
    estadoCivil: '',
    direccion: '',
    telefono: '',
    correo: '',
    ocupacion: '',
    acompañante: '',
    telefonoAcompañante: '',
    parentezco: '',
    ingresoPor: '',
    observaciones: '',
    fechaIngreso: '',
    tipoPaciente: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormDataHc({ ...formDataHc, [name]: value });
  };

  const [tablaDatos, setTablaDatos] = useState([
    { id: "", fecha: "", tipo: "" },
    // Agrega los otros datos similares aquí
  ]);

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Verificar si la cédula ingresada es la de ejemplo "1234567890"
      if (event.target.value === '1234567890') {
        setFormDataHc({
          paciente: '1234567890',
          nombre: 'Juan Pérez',
          areaServicio: 'CONSULTA EXTERNA',
          hora: '09:30',
          ingreso: 'Urgencia',
          tipoAtencion: 'Presencial',
          contrato: 'A12345',
          plan: 'Plan A',
          rango: 'Bronce',
          fechaNaciemiento: '1985-05-15',
          edad: '37',
          sexo: 'Masculino',
          estadoCivil: 'Casado',
          direccion: 'Calle 123, Ciudad XYZ',
          telefono: '123-456-7890',
          correo: 'juanperez@example.com',
          ocupacion: 'Ingeniero',
          acompañante: 'María Rodríguez',
          telefonoAcompañante: '987-654-3210',
          parentezco: 'Esposa',
          ingresoPor: 'Referido por médico de cabecera',
          observaciones: 'Paciente presenta alergia al ibuprofeno',
          fechaIngreso: '2024-04-25',
          tipoPaciente: 'Nuevo ingreso',
        });

        setTablaDatos([
          { id: 1, fecha: '27/04/2024', tipo: 'CONSULTA MEDICA' },
          { id: 2, fecha: '28/04/2024', tipo: 'EXAMEN DE SANGRE' },
          { id: 3, fecha: '29/04/2024', tipo: 'ECOGRAFIA' },
          { id: 4, fecha: '30/04/2024', tipo: 'CONSULTA DE SEGUIMIENTO' },
          { id: 5, fecha: '01/05/2024', tipo: 'ANALISIS DE ORINA' },
        ]);

      } else {
        // Limpiar el formulario si la cédula ingresada no coincide
        setFormDataHc({
          paciente: '',
          nombre: '',
          areaServicio: '',
          hora: '',
          ingreso: '',
          tipoAtencion: '',
          contrato: '',
          plan: '',
          rango: '',
          fechaNacimiento: '',
          edad: '',
          sexo: '',
          estadoCivil: '',
          direccion: '',
          telefono: '',
          correo: '',
          ocupacion: '',
          acompañante: '',
          telefonoAcompañante: '',
          parentezco: '',
          ingresoPor: '',
          observaciones: '',
          fechaIngreso: '',
          tipoPaciente: '',
        });
      }
    }
  };

  const [isOpenPaciente, setIsOpenPaciente] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const toggleModalCrearPaciente = () => {
    setIsOpenPaciente(!isOpenPaciente);
    // console.log("erro")
  };

  const toggleModalSearch = () => {
    setIsOpenSearch(!isOpenSearch);
    // console.log("erro")
  };

  return (
    <>
      <div className="h-max lg:h-full border rounded-lg rounded-r-none gap-5 m-2 mr-0">
        <div className="w-full h-max bg-sky-700 flex items-center justify-between gap-1 text-white text-md font-semibold rounded-t-md rounded-r-none p-3">
          <div className="flex items-center gap-1">
            <h1 className="">Historias Clínicas</h1>
          </div>
        </div>
        <div className="px-4 py-5">
          <div className="block lg:flex items-center gap-1.5">

            <div className="flex-1 w-full">
              <label htmlFor="codigo" className="block text-sm font-medium text-sky-700">Paciente</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <button type="button" onClick={toggleModalCrearPaciente} className="-ml-px shadow-md bg-sky-700 text-teal-50 relative inline-flex items-center space-x-2 px-4 py-[9px] border border-sky-700 text-sm font-medium rounded-l-md  hover:bg-sky-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                  <MdPeopleAlt />
                </button>
                <input type="text" name="paciente" id="paciente" value={formDataHc.paciente} onChange={handleInputChange} onKeyDown={handleEnterKeyPress} className="flex-1 pl-2 text-gray-600 font-semibold shadow-md block w-full min-w-0 border sm:text-sm border-gray-300" />
                <button type="button" onClick={toggleModalSearch} className="-ml-px shadow-md bg-sky-700 text-teal-50 relative inline-flex items-center space-x-2 px-4 py-[9px] border border-sky-700 text-sm font-medium rounded-r-md  hover:bg-sky-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full">
              <label htmlFor="nombre" className="block text-sm font-medium text-sky-700">Nombre</label>
              <input
                value={formDataHc.nombre}
                type="text"
                name="nombre"
                id="nombre"
                onChange={handleInputChange}
                className="flex-1 mt-1 shadow-sm block w-full min-w-0 rounded-md sm:text-sm border-gray-300 bg-gray-300 cursor-not-allowed py-2 pl-2"
                disabled
              />
            </div>

            <div class="flex-1 w-full">
              <label for="area_servicio" class="block text-sm font-medium text-sky-700">Area de Servicio</label>
              <select name="area_servicio" id="area_servicio" value={formDataHc.areaServicio} onChange={handleInputChange} class="flex-1 mt-1 pl-2 shadow-sm block w-full min-w-0 rounded-md sm:text-sm border border-gray-300 py-2">
                <option value="CONSULTA EXTERNA">CONSULTA EXTERNA</option>
                <option value="DOMICILIARIA">DOMICILIARIA</option>
              </select>
            </div>

            <div class="flex-1 w-full">
              <label for="hora" class="block text-sm font-medium text-sky-700">Hora</label>
              <input type="time" name="hora" id="hora" value={formDataHc.hora} onChange={handleInputChange} class="flex-1 mt-1 px-2 shadow-sm block w-full min-w-0 rounded-md sm:text-sm border border-gray-300 py-[7px]" />
            </div>

            <div class="flex-1 w-full">
              <label for="ingreso" class="block text-sm font-medium text-sky-700">Ingreso</label>
              <input type="text" name="ingreso" id="ingreso" value={formDataHc.ingreso} onChange={handleInputChange} class="flex-1 mt-1 px-2 shadow-sm block w-full min-w-0 rounded-md sm:text-sm border border-gray-300 py-2" />
            </div>

            <div class="flex-1 w-full">
              <label for="tipo_atencion" class="block text-sm font-medium text-sky-700">Tipo Atención</label>
              <select name="tipo_atencion" id="tipo_atencion" value={formDataHc.tipoAtencion} onChange={handleInputChange} class="flex-1 mt-1 pl-2 shadow-sm block w-full min-w-0 rounded-md sm:text-sm border border-gray-300 py-2">
                <option value="Presencial">Presencial</option>
                <option value="Seguimiento telefonico o virtual">Seguimiento telefonico o virtual</option>
                <option value="Atencion por telesalud">Atencion por telesalud</option>
              </select>
            </div>

          </div>
          <div className="w-full block lg:flex gap-3 mt-10">
            <div className="w-full lg:w-[75%] h-max bg-[#fcf8e3] border border-[#faf4d7] border rounded-md py-4 px-2 pl-3">
              <div className="block lg:flex mb-2">
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Contrato: <span class="font-medium text-gray-500">{formDataHc.contrato}</span>
                  </label>
                </div>
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Plan: <span class="font-medium text-gray-500">{formDataHc.plan}</span>
                  </label>
                </div>
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Rango: <span class="font-medium text-gray-500">{formDataHc.rango}</span>
                  </label>
                </div>
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Fecha de Nacimiento: <span class="font-medium text-gray-500">{formDataHc.fechaNaciemiento}</span>
                  </label>
                </div>
              </div>
              <div className="block lg:flex mb-2">
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Edad: <span class="font-medium text-gray-500">{formDataHc.edad}</span>
                  </label>
                </div>
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Sexo: <span class="font-medium text-gray-500">{formDataHc.sexo}</span>
                  </label>
                </div>
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Estado Civil: <span class="font-medium text-gray-500">{formDataHc.estadoCivil}</span>
                  </label>
                </div>
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Dirección: <span class="font-medium text-gray-500">{formDataHc.direccion}</span>
                  </label>
                </div>
              </div>
              <div className="block lg:flex mb-2">
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Teléfono: <span class="font-medium text-gray-500">{formDataHc.telefono}</span>
                  </label>
                </div>
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Correo: <span class="font-medium text-gray-500">{formDataHc.correo}</span>
                  </label>
                </div>
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Acompañante: <span class="font-medium text-gray-500">{formDataHc.acompañante}</span>
                  </label>
                </div>
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Teléfono Acompañante: <span class="font-medium text-gray-500">{formDataHc.telefonoAcompañante}</span>
                  </label>
                </div>
              </div>
              <div className="block lg:flex mb-2">
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Parentesco: <span class="font-medium text-gray-500">{formDataHc.parentezco}</span>
                  </label>
                </div>
                <div class="w-full w-full lg:w-1/2 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Ingreso Por: <span class="font-medium text-gray-500">{formDataHc.ingresoPor}</span>
                  </label>
                </div>
                <div class="w-full w-full lg:w-1/2 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Observaciones: <span class="font-medium text-gray-500">{formDataHc.observaciones}</span>
                  </label>
                </div>
              </div>
              <div className="block lg:flex">
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Fecha Ingreso: <span class="font-medium text-gray-500">{formDataHc.fechaIngreso}</span>
                  </label>
                </div>
                <div class="w-full w-full lg:w-1/4 mb-4">
                  <label class="block text-sm font-bold text-gray-700">
                    Tipo Paciente:: <span class="font-medium text-gray-500">{formDataHc.tipoPaciente}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full mt-4 lg:mt-0 lg:w-[25%] h-max">
              <button className="w-full bg-sky-700 text-white px-4 py-1 border border-sky-700 rounded-md">Seleccione Tipo HC</button>
              <div className="overflow-auto max-h-[200px] border-double border-4 border-sky-700">
                <table className="min-w-full">
                  <thead className="bg-sky-700 text-white text-sm">
                    <tr>
                      <th className="px-6 py-1 border font-medium">#</th>
                      <th className="px-6 py-1 border font-medium">Fecha</th>
                      <th className="px-6 py-1 border font-medium">Tipo</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-sm">
                    {tablaDatos.map((dato) => (
                      <tr key={dato.id} className="">
                        <td className="px-6 py-2 border">{dato.id}</td>
                        <td className="px-6 py-2 border">{dato.fecha}</td>
                        <td className="px-6 py-2 border"><p className="w-max">{dato.tipo}</p></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
      {isOpenPaciente && (
        <>
          <PacienteHc toggleModalCrearPaciente={toggleModalCrearPaciente} />
        </>
      )}
      {isOpenSearch && (
        <div>
          <div id="defaultModal" tabindex="-1" aria-hidden="true" className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur bg-opacity-35">
            <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
              <div class="relative p-4 bg-white rounded-lg shadow sm:p-5">
                <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 class="flex items-center gap-1 text-lg font-semibold text-sky-700 dark:text-white">
                    <FaSearch />
                    Buscar ...
                  </h3>
                  <button onClick={toggleModalSearch} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div class="grid gap-4 mb-4 sm:grid-cols-1">
                  <div className="flex flex-col lg:flex-row w-full gap-3">
                    <select
                      name="category"
                      id="category"
                      className="flex-1 mt-1 px-2 shadow-sm block w-full min-w-0 rounded-md sm:text-sm text-sky-700 border border-gray-300 py-2"
                    >
                      <option value="historia">Historia</option>
                      <option value="paciente">Paciente</option>
                      <option value="ingreso">Ingreso</option>
                      <option value="fecha_ingreso">Fecha Ingreso</option>
                    </select>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="flex-1 mt-1 px-2 shadow-sm block w-full min-w-0 rounded-md sm:text-sm text-sky-700 border border-gray-300 py-2"
                      placeholder="Buscar..."
                    />
                  </div>
                  <div class="sm:col-span-2 overflow-hidden ">
                    <label for="description" class="block mb-2 text-sm font-medium text-sky-700 dark:text-white">Resultado de Busqueda</label>
                    <div className="h-[200px] overflow-x-auto relative border sm:rounded-lg">
                      <table className="min-w-[1024px]  lg:w-full text-sm  text-gray-500 text-center">
                        <thead className="text-xs text-gray-100 uppercase bg-[#729d3b]">

                        </thead>
                        <tbody>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row w-full justify-between ">
                  <div>
                    <label for="seleccion" class="block text-sm font-medium text-sky-700">Seleccion</label>
                    <input type="number" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" disabled />
                  </div>
                  <button class="text-white mt-3 items-center bg-sky-700 flex justify-center lg:justify-end hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 lg:py-0 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Seleccionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoriaClinica;
