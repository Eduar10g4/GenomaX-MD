// Login.js
import React, { useState } from 'react';
import IMGX from "../../assets/img/favicon.ico"
import SRC from "../../assets/Videos/video-login.mp4"
import { FaChevronRight } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import bcrypt from 'bcryptjs-react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Register from '../register/register';
import EmailRecuperacion from '../modals/emailRecuperacion';

const Login = () => {

  const [currentTab, setCurrentTab] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const openModal = () => {
    setOpen(!open)
  }

  const handleSubmit = async () => {

    setFormSubmitted(true);

    if (!username || !password) {
      // Si no hay datos en los campos de entrada, no realizar la solicitud
      return;
    }

    // Encriptar la contraseña antes de enviarla al servidor
    const hashedPassword = await bcrypt.hash(password, 10);

    const formData = new FormData();
    formData.append('ID_USR', username);
    formData.append('Clave_USR', password);
    formData.append('nxsdb', '_md');
    formData.append('Codigo_USR', '1');

    try {
      const response = await fetch('https://apimd.genomax.app/api/login', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // Si la respuesta es exitosa, mostrar mensaje de éxito
        // setEmail('')
        // setPassword('')
        const data = await response.json();
        console.log(data);
        const { ID_USR, Nombre_USR, Email_USR, Activo_USR } = data.user;
        sessionStorage.setItem('token', data.Tokens);
        sessionStorage.setItem('ID_USR', ID_USR);
        sessionStorage.setItem('Nombre_USR', Nombre_USR);
        sessionStorage.setItem('Email_USR', Email_USR);
        sessionStorage.setItem('Activo_USR', Activo_USR);
        
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: 'Bienvenido!',
        });
        navigate("/")

      } else {
        // Si la respuesta tiene error, mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error en el login',
          text: 'Credenciales inválidas',
        });
      }
    } catch (error) {
      // Si hay un error en la solicitud, mostrar mensaje de error
      console.error('Error al enviar la solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.',
      });
    }
    setFormSubmitted(false)
  };

  return (
    <>
      <div className='w-full h-full flex justify-center items-center bg-gray-200'>
        <div className='flex border-solid border-2 w-full md:w-[90%] h-full md:h-[90%] lg:h-5/6'>
          <div className="w-full lg:w-3/5 h-full lg:h-full bg-white flex flex-col rounded-3xl lg:rounded-none lg:rounded-l-3xl justify-center items-center">
            <div className="pb-8">
              <img src={IMGX} alt="img_genomax" className="w-24" />
            </div>
            {currentTab === 1 && (
              <>
                <div className="pb-4">
                  <h1 className="font-bold text-xl text-gray-600">Iniciar sesión</h1>
                  <div className="w-full h-1 relative">
                    <div className="w-10 h-full bg-blue-500 absolute left-0 top-0 animate-slide"></div>
                  </div>
                </div>
                <form
                  // onSubmit={handleSubmit}
                  className="w-full md:w-[50%] h-max px-10 lg:px-0 lg:w-max flex flex-col justify-center"
                >
                  <div className="w-full flex flex-col mb-4">
                    <label htmlFor="email" className="font-semibold pb-2">
                      Usuario
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Usuario"
                      className="w-full lg:w-80 h-10 pl-4 shadow-lg focus:outline-none focus:ring focus:ring-blue-500 rounded"
                      onChange={handleUsernameChange}
                    />
                    {!username && formSubmitted && (
                      <p className='text-sm text-red-500'>Este campo es Obligatorio</p>
                    )}
                  </div>
                  <div className="w-full flex flex-col mb-6">
                    <label htmlFor="password" className="font-semibold pb-2">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="Password"
                      id="password"
                      placeholder="Contraseña"
                      className="w-full lg:w-80 h-10 pl-4 shadow-lg focus:outline-none focus:ring focus:ring-blue-500 rounded"
                      onChange={handlePasswordChange}
                    />
                    {!password && formSubmitted && (
                      <p className='text-sm text-red-500'>Este campo es Obligatorio</p>
                    )}
                  </div>
                  <button type='button' onClick={handleSubmit} className="w-full lg:w-80 h-10 bg-green-600 text-white hover:bg-green-500 rounded mb-4">
                    Iniciar Sesion
                  </button>
                </form>
                <div className="w-full flex justify-center">
                  <button
                    onClick={() => setCurrentTab(2)}
                    className="text-center flex justify-center items-center"
                  >
                    <FaChevronRight className="pr-2" />
                    Registrarse
                  </button>
                  <button
                    onClick={openModal}
                    className="text-center flex justify-start pl-5 "
                  >
                    ¿No puedes Iniciar?
                  </button>
                </div>
              </>
            )}

            {open && (
              <>
                {/* Renderizar el componente emailRecuperacion aquí */}
                <EmailRecuperacion openModal={openModal} />
              </>
            )}

            {currentTab === 2 && (
              <>
                <button onClick={() => setCurrentTab(1)}>
                  <FaArrowLeftLong className="text-xl" />
                </button>
                <Register />
              </>
            )}
          </div>
          <div className='hidden lg:block w-3/5 h-full '>
            <video
              className='rounded-r-3xl object-cover min-w-full min-h-full'
              controls={false}
              autoPlay={true}
              loop={true}
              muted={true}>
              <source
                src={SRC}
                type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </>

  );
};

export default Login;
