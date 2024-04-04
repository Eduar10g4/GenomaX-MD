import React, { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
            <form
                // onSubmit={handleSubmit}
                className="w-full md:w-[50%] px-10 lg:px-0 lg:w-max flex flex-col justify-center"
            >
                <div className="w-full flex flex-col mb-4">
                    <label htmlFor="username" className="font-semibold pb-2">
                        Primer Nombre
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Primer Nombre"
                        className="w-full lg:w-80 h-10 pl-4 shadow-lg focus:outline-none focus:ring focus:ring-blue-500 rounded"
                    //  onChange={handleUsernameChange}
                    />
                </div>
                <div className="w-full flex flex-col mb-4">
                    <label htmlFor="lastname" className="font-semibold pb-2">
                        Segundo Nombre
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Segundo Nombre"
                        className="w-full lg:w-80 h-10 pl-4 shadow-lg focus:outline-none focus:ring focus:ring-blue-500 rounded"
                    //  onChange={handleUsernameChange}
                    />
                </div>
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
                    //onChange={handleUsernameChange}
                    />
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
                    // onChange={handlePasswordChange}
                    />
                </div>
                <button type='button'  className="w-full lg:w-80 h-10 bg-green-600 text-white hover:bg-green-500 rounded mb-4">
                   Registrarse
                </button>
            </form>
    )
}

export default Register;