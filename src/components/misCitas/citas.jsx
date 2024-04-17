import { useState, useEffect } from "react";

const Citas = () => {

     {/** obtener datos del localStorage y sessionStorage **/}
     const nxsdb = localStorage.getItem("nxsdbParam")
     const token = sessionStorage.getItem('token');
     const codigo_USR = sessionStorage.getItem('Codigo_USR');

    useEffect(() => {
        const ListaPacientes = async () => {
            const formData = new FormData();
            formData.append('nxs_db', nxsdb);
            formData.append('Codigo_USR', codigo_USR);


            try {
                const response = await fetch('https://apimd.genomax.app/api/showPacientes', {
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
            }
        }

        ListaPacientes();
    }, [])

    return (
        <div>

        </div>
    )
}

export default Citas