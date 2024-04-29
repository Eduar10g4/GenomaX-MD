import React, { useState, useEffect } from "react";

const PacienteHc = ({ toggleModalCrearPaciente }) => {

    // Datos Paciente
    const [formDataPaciente, setFormDataPaciente] = useState({
        id: '',
        tipoId: '',
        expEn: '',
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        tipoPaciente: '',
        tipoAfiliacion: '',
        contrato: '',
        plan: '',
        rango: '',
        empresa: '',
        actividad: '',
        sexo: '',
        fechaNacimiento: '',
        estadoCivil: '',
        departamento: '',
        municipio: '',
        zona: '',
        barrio: '',
        direccion: '',
        telefono: '',
        correo: '',
        responsable: '',
        celular: '',
        parentesco: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormDataPaciente({ ...formDataPaciente, [name]: value });
    };

    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Verificar si la cédula ingresada es la de ejemplo "1234567890"
            if (event.target.value === '1001978765') {
                setFormDataPaciente({
                    id: '1001978765',
                    tipoId: '1',
                    expEn: 'Bogotá',
                    primerNombre: 'Juan',
                    segundoNombre: 'Carlos',
                    primerApellido: 'Gomez',
                    segundoApellido: 'Perez',
                    tipoPaciente: '1',
                    tipoAfiliacion: '1',
                    contrato: 'A12345',
                    plan: 'Plan A',
                    rango: '1',
                    empresa: 'Empresa ABC',
                    actividad: 'Empleado',
                    sexo: 'M',
                    fechaNacimiento: '1985-05-15',
                    estadoCivil: 'SOLTERO (A)',
                    departamento: 'Cundinamarca',
                    municipio: 'Bogotá',
                    zona: 'U',
                    barrio: 'Chapinero',
                    direccion: 'Calle 123, Ciudad XYZ',
                    telefono: '123-456-7890',
                    correo: 'juancarlos@example.com',
                    responsable: 'María Rodríguez',
                    celular: '987-654-3210',
                    parentesco: 'Esposa'
                });

            } else {
                // Limpiar el formulario si la cédula ingresada no coincide
                setFormDataHc({
                    id: '',
                    tipoId: '',
                    expEn: '',
                    primerNombre: '',
                    segundoNombre: '',
                    primerApellido: '',
                    segundoApellido: '',
                    tipoPaciente: '',
                    tipoAfiliacion: '',
                    contrato: '',
                    plan: '',
                    rango: '',
                    empresa: '',
                    actividad: '',
                    sexo: '',
                    fechaNacimiento: '',
                    estadoCivil: '',
                    departamento: '',
                    municipio: '',
                    zona: '',
                    barrio: '',
                    direccion: '',
                    telefono: '',
                    correo: '',
                    responsable: '',
                    celular: '',
                    parentesco: ''
                });
            }
        }
    };

    return (
        <>
            <div>
                <div id="defaultModal" tabindex="-1" aria-hidden="true" className="fixed inset-0 flex flex-col gap-4 items-center py-2 z-50 bg-black bg-opacity-25 backdrop-blur shadow-xl rounded-lg border border-white border-opacity-25">
                    <div class="relative p-4 w-full h-full ">

                        <div class="h-full p-4 bg-white rounded-lg shadow sm:p-5 overflow-y-auto">

                            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                <h3 class="text-lg font-semibold text-sky-700 dark:text-white px-2">
                                    Pacientes
                                </h3>
                                <button onClick={toggleModalCrearPaciente} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="w-max h-max bg-sky-700 text-xs text-white font-semibold relative top-2 left-4 border border-sky-700 rounded-md px-2">
                                <label>Paciente</label>
                            </div>
                            <div className="bg-gray-100 w-full h-[50%] overflow-y-auto md:h-max shadow-gray-400 border-[1px] p-8 px-5 pr-8 rounded-lg shadow-md">
                                <div className="w-full " >
                                    <div className="flex gap-2 flex-col lg:flex-row w-full items-center space-x-1 space-y-2 lg:space-y-0">

                                        <div className="flex-1 w-full">
                                            <label htmlFor="id" className="block text-sm font-medium text-sky-700 mb-1">ID</label>
                                            <input
                                                type="text"
                                                name="id"
                                                id="id"
                                                value={formDataPaciente.id}
                                                onChange={handleInputChange}
                                                onKeyDown={handleEnterKeyPress}
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="tipoId" className="block text-sm font-medium text-sky-700 mb-1">Tipo</label>
                                            <select
                                                value={formDataPaciente.tipoId}
                                                onChange={handleInputChange}
                                                name="tipoId"
                                                id="tipoId"
                                                className="flex-1 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 pl-1 py-2"
                                            >
                                                <option value="">Seleccionar</option>
                                                <option value="1">CC - Cédula Ciudadanía</option>
                                                <option value="2">CE - Cédula Extranjería</option>
                                                <option value="3">PA - Pasaporte</option>
                                                <option value="4">RC - Registro Civil</option>
                                                <option value="5">TI - Tarjeta Identidad</option>
                                                <option value="6">AS - Adulto Sin Identificación</option>
                                                <option value="7">MS - Menor Sin Identificación</option>
                                                <option value="8">NU - Número Único de Identificación</option>
                                                <option value="9">NI - Número de Identificación Tributaria</option>
                                                <option value="10">PE - Permiso Especial de Permanencia</option>
                                                <option value="11">SC - Salvoconducto</option>
                                                <option value="12">CN - Certificado Nacido Vivo</option>
                                                <option value="13">PT - Permiso Temporal</option>
                                            </select>
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="expEn" className="block text-sm font-medium text-sky-700 mb-1">Exp. en </label>
                                            <input
                                                value={formDataPaciente.expEn}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="expEn"
                                                id="expEn"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="primerNombre" className="block text-sm font-medium text-sky-700 mb-1">Primer Nombre</label>
                                            <input
                                                value={formDataPaciente.primerNombre}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="primerNombre"
                                                id="primerNombre"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="segundoNombre" className="block text-sm font-medium text-sky-700 mb-1">Segundo Nombre</label>
                                            <input
                                                value={formDataPaciente.segundoNombre}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="segundoNombre"
                                                id="segundoNombre"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="primerApellido" className="block text-sm font-medium text-sky-700 mb-1">Primer Apellido</label>
                                            <input
                                                value={formDataPaciente.primerApellido}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="primerApellido"
                                                id="primerApellido"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="segundoApellido" className="block text-sm font-medium text-sky-700 mb-1">Segundo Apellido</label>
                                            <input
                                                value={formDataPaciente.segundoApellido}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="segundoApellido"
                                                id="segundoApellido"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-max h-max bg-sky-700 text-xs text-white font-semibold relative top-2 left-4 border border-sky-700 rounded-md px-2 mt-1">
                                <label>Afiliacion</label>
                            </div>
                            <div className="bg-gray-100 w-full h-[50%] overflow-y-auto md:h-max shadow-gray-400 border-[1px] p-8 px-5 pr-8 rounded-lg shadow-md">
                                <div className="w-full " >
                                    <div className="flex gap-2 flex-col lg:flex-row w-full items-center space-x-1 space-y-2 lg:space-y-0">

                                        <div className="flex-1 w-full">
                                            <label htmlFor="tipoPaciente" className="block text-sm font-medium text-sky-700 mb-1">Tipo Paciente</label>
                                            <select
                                                value={formDataPaciente.tipoPaciente}
                                                onChange={handleInputChange}
                                                name="tipoPaciente"
                                                id="tipoPaciente"
                                                className="flex-1 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 pl-1 py-2"
                                            >
                                                <option value="">Seleccionar</option>
                                                <option value="1">Contributivo</option>
                                                <option value="2">Subsidiado</option>
                                                <option value="3">Vinculado</option>
                                                <option value="4">Particular</option>
                                                <option value="5">Especial</option>
                                                <option value="6">Otro</option>
                                            </select>
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label htmlFor="tipoAfiliacion" className="block text-sm font-medium text-sky-700 mb-1">Tipo Afiliacion</label>
                                            <select
                                                value={formDataPaciente.tipoAfiliacion}
                                                onChange={handleInputChange}
                                                name="tipoAfiliacion"
                                                id="tipoAfiliacion"
                                                className="flex-1 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 pl-1 py-2"
                                            >
                                                <option value="">Seleccionar</option>
                                                <option value="1">Cotizante</option>
                                                <option value="2">Beneficiario</option>
                                                <option value="3">Adicional</option>
                                            </select>
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label htmlFor="contrato" className="block text-sm font-medium text-sky-700 mb-1">Contrato</label>
                                            <select
                                                value={formDataPaciente.contrato}
                                                onChange={handleInputChange}
                                                name="contrato"
                                                id="contrato"
                                                className="flex-1 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 pl-1 py-2"
                                            >
                                                <option value="">Seleccionar</option>

                                            </select>
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label htmlFor="plan" className="block text-sm font-medium text-sky-700 mb-1">Plan</label>
                                            <select
                                                value={formDataPaciente.plan}
                                                onChange={handleInputChange}
                                                name="plan"
                                                id="plan"
                                                className="flex-1 pl-1 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2"
                                            >
                                                <option value="">Seleccionar</option>
                                            </select>
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label htmlFor="rango" className="block text-sm font-medium text-sky-700 mb-1">Rango</label>
                                            <select
                                                value={formDataPaciente.rango}
                                                onChange={handleInputChange}
                                                name="rango"
                                                id="rango"
                                                className="flex-1 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 pl-1 py-2"
                                            >
                                                <option value="">Seleccionar</option>
                                                <option value="1">Rango 1</option>
                                                <option value="2">Rango 2</option>
                                                <option value="3">Rango 3</option>
                                                <option value="0">SOAT</option>
                                            </select>
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="empresa" className="block text-sm font-medium text-sky-700 mb-1">Empresa</label>
                                            <input
                                                value={formDataPaciente.empresa}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="empresa"
                                                id="empresa"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="actividad" className="block text-sm font-medium text-sky-700 mb-1">Actividad</label>
                                            <input
                                                value={formDataPaciente.actividad}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="actividad"
                                                id="actividad"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-max h-max bg-sky-700 text-xs text-white font-semibold relative top-2 left-4 border border-sky-700 rounded-md px-2 mt-1">
                                <label>Datos Personales</label>
                            </div>
                            <div className="bg-gray-100 w-full h-[50%] overflow-y-auto md:h-max shadow-gray-400 border-[1px] p-8 px-5 pr-8 rounded-lg shadow-md">
                                <div className="w-full " >
                                    <div className="flex gap-2 flex-col lg:flex-row w-full items-center space-x-1 space-y-2 lg:space-y-0">
                                        <div className="flex-1 w-full">
                                            <label htmlFor="sexo" className="block text-sm font-medium text-sky-700 mb-1">Sexo</label>
                                            <select
                                                value={formDataPaciente.sexo}
                                                onChange={handleInputChange}
                                                name="sexo"
                                                id="sexo"
                                                className="flex-1 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 pl-1 py-2"
                                            >
                                                <option value="">Seleccionar</option>
                                                <option value="F">Femenino</option>
                                                <option value="M">Masculino</option>
                                            </select>
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-sky-700 mb-1">Fecha Nacimiento</label>
                                            <input
                                                value={formDataPaciente.fechaNacimiento}
                                                onChange={handleInputChange}
                                                type="date"
                                                name="fechaNacimiento"
                                                id="fechaNacimiento"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="estadoCivil" className="block text-sm font-medium text-sky-700 mb-1">Estado Civil</label>
                                            <select
                                                value={formDataPaciente.estadoCivil}
                                                onChange={handleInputChange}
                                                name="estadoCivil"
                                                id="estadoCivil"
                                                className="flex-1 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 pl-1 py-2"
                                            >
                                                <option value="">Seleccionar</option>
                                                <option value="SOLTERO (A)" selected="selected">SOLTERO (A)</option>
                                                <option value="CASADO (A)">CASADO (A)</option>
                                                <option value="VIUDO (A)">VIUDO (A)</option>
                                                <option value="UNION LIBRE">UNION LIBRE</option>
                                                <option value="SEPARADO (A) / DIVORCIADO (A)">SEPARADO (A) / DIVORCIADO (A)</option>
                                            </select>
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="departamento" className="block text-sm font-medium text-sky-700 mb-1">Departamento</label>
                                            <select
                                                value={formDataPaciente.departamento}
                                                onChange={handleInputChange}
                                                name="departamento"
                                                id="departamento"
                                                className="flex-1 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 pl-1 py-2"
                                            >
                                                <option value="">Seleccionar</option>

                                            </select>
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="municipio" className="block text-sm font-medium text-sky-700 mb-1">Municipio</label>
                                            <select
                                                value={formDataPaciente.municipio}
                                                onChange={handleInputChange}
                                                name="municipio"
                                                id="municipio"
                                                className="flex-1 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 pl-1 py-2"
                                            >
                                                <option value="">Seleccionar</option>
                                            </select>
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="zona" className="block text-sm font-medium text-sky-700 mb-1">Zona</label>
                                            <select
                                                value={formDataPaciente.zona}
                                                onChange={handleInputChange}
                                                name="zona"
                                                id="zona"
                                                className="flex-1 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 pl-1 py-2"
                                            >
                                                <option value="">Seleccionar</option>
                                                <option value="U">Urbana</option>
                                                <option value="R">Rural</option>
                                            </select>
                                        </div>

                                        <div className="flex-1 w-full">
                                            <label htmlFor="barrio" className="block text-sm font-medium text-sky-700 mb-1">Barrio</label>
                                            <input
                                                value={formDataPaciente.barrio}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="barrio"
                                                id="barrio"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full mt-4" >
                                    <div className="flex gap-2 flex-col lg:flex-row w-full items-center space-x-1 space-y-2 lg:space-y-0">
                                        <div className="flex-1 w-full">
                                            <label htmlFor="direccion" className="block text-sm font-medium text-sky-700 mb-1">Direccion</label>
                                            <input
                                                value={formDataPaciente.direccion}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="direccion"
                                                id="direccion"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label htmlFor="telefono" className="block text-sm font-medium text-sky-700 mb-1">Telefono</label>
                                            <input
                                                value={formDataPaciente.telefono}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="telefono"
                                                id="telefono"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label htmlFor="correo" className="block text-sm font-medium text-sky-700 mb-1">Correo</label>
                                            <input
                                                value={formDataPaciente.correo}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="correo"
                                                id="correo"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label htmlFor="responsable" className="block text-sm font-medium text-sky-700 mb-1">Responsable</label>
                                            <input
                                                value={formDataPaciente.responsable}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="responsable"
                                                id="responsable"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label htmlFor="celular" className="block text-sm font-medium text-sky-700 mb-1">Celular</label>
                                            <input
                                                value={formDataPaciente.celular}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="celular"
                                                id="celular"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label htmlFor="parentesco" className="block text-sm font-medium text-sky-700 mb-1">Parentesco</label>
                                            <input
                                                value={formDataPaciente.parentesco}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="parentesco"
                                                id="parentesco"
                                                className="flex-1 px-2 shadow-md block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-2 "
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 mt-5 px-3">

                                <button
                                    // onClick={CreacionPaciente}
                                    className={`flex justify-center items-center bg-sky-700 custom-button text-white text-sm w-max font-semibold py-2 px-4 rounded hover:bg-sky-800`}
                                    type="button"
                                //  disabled={botonBloqueado}
                                >
                                    <div className="svg-wrapper-1">
                                        <div className="svg-wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="18">
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <span>Guardar</span>
                                </button>

                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PacienteHc;