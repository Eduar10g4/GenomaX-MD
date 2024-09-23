import React from "react";

const EmailRecuperacion = ({ openModal }) => {
    return (
        <div className='fixed z-10 inset-0 bg-gradient-to-r from-slate-500 flex justify-center items-center p-0 md:p-4'>
            <div className="w-full md:w-max h-max bg-white border-black rounded-xl">
                <div className="w-full flex flex-col justify-center items-center p-5 md:p-10 md:px-6 space-y-8">
                    <h3 className="text-xl">¿No puedes iniciar sesión?</h3>
                    <div className="w-full md:w-max flex flex-col">
                        <span className="text-sm text-gray-400 pb-1">Enviaremos un enlace de recuperación a</span>
                        <input type="email" name="newpasswordcorrea" id="" placeholder="Introducir tu correo " className="ring-2 w-full h-9 pl-2 text-gray-500 rounded" />
                        <button
                            type="button"
                            //onClick={() => props.setActive(!props.active)}
                            className='rounded-md ring-2 w-full h-9 bg-blue-500 text-white hover:bg-blue-600 mt-4'
                        >
                            Enviar enlace de recuperacion
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={openModal}
                        className='hover:underline ring-red-300 w-full h-10 text-blue-400'
                    >
                        Volver a Inicio de sesión
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmailRecuperacion;