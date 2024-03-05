/** import genomax from "../../assets/img/favicon.ico";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import {Link }from 'react-router-dom'
import "./Style.css";

const NewPassword = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  */
  {/**
  return (
    <>
      <Formik
        initialValues={{
          password: "",
          password2: "",
        }}
        validate={(valores) => {
          let errores = {};

          // Validacion Password
          if (!valores.password) {
            errores.password = "Ingrese su nueva Contraseña";
          } else if (!/^[a-zA-Z0-9]{4,12}$/.test(valores.password)) {
            errores.password =
              "❌(minimo 4   caracteres, solo letras y numeros)";
          }

          // Validacion Password2
          if (valores.password !== valores.password2) {
            errores.password2 = "Contraseña Incorrecta❗";
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false), 5000);
        }}
      >
        {({ errors }) => (
          <div className="password w-full h-screen grid place-items-center">
              <div className="h-[454px] max-h-[454px] w-[95%] sm:w-[380px] bg-white p-2.5 -mt-[62px] sm:mt-[28px]">
                <div className="w-full flex justify-center items-center mt-1 mb-3">
                  <img src={genomax} alt="" className="w-11 h-11" />
                  <span className="text-emerald-600 pl-1 text-lg">GenomaX</span>
                </div>
                <div className="border-b w-full"></div>
                <h1 className="mt-5 ml-5 text-[16.4px]">
                  🔑 Cambiar Contraseña
                </h1>
                <Form className="w-full">
                  <div className="ml-4 mr-4 h-[258px]">
                    <div className="">
                      <label
                        htmlFor="password_actual"
                        className="block mt-5 mb-[3px] text-[14.4px] cursor-pointer"
                      >
                        Contraseña Actual
                      </label>
                      <Field
                        type="password"
                        id="password_actual"
                        name="password_actual"
                        className="formulario__input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mt-5 mb-[3px] text-[14.4px] cursor-pointer"
                      >
                        Nueva Contraseña
                      </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="formulario__input"
                      />
                      <ErrorMessage
                        name="password"
                        component={() => (
                          <span className="w-full block text-red-600 text-[13.7px]">
                            {errors.password}
                          </span>
                        )}
                      />
                    </div>
                    <div className="mb-8">
                      <label
                        htmlFor="password2"
                        className="block mt-5 mb-[3px] text-[13.7px] cursor-pointer"
                      >
                        Confirmar Contraseña
                      </label>
                      <Field
                        type="password"
                        id="password2"
                        name="password2"
                        className="formulario__input"
                      />
                      <ErrorMessage
                        name="password2"
                        component={() => (
                          <span className="block text-red-600 text-[14.4px]">
                            {errors.password2}
                          </span>
                        )}
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-center pr-2">
                  <Link to="/">  
                    <button
                      type="button"
                      className="w-[90px] h-[36px] bg-blue-600 shadow-xl text-white border hover:bg-blue-700 border-solid border-blue-700 rounded-sm"
                    >
                      Cancelar
                    </button>
                    </Link>
                    <button
                      type="submit"
                      className="w-[90px] h-[36px] ml-6 mb-1 bg-lime-600 shadow-xl text-white border hover:bg-lime-700 border-solid border-lime-700 rounded-sm"
                    >
                      Guardar
                    </button>
                  </div>
                  {formularioEnviado && <p className="relative -top-[75px] text-center text-lime-600 text-[15px]">Su contraseña se ha restablecido correctamente✔</p>}
                </Form>
              </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default NewPassword; */}