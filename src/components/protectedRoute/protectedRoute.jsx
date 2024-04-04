import {useState,useEffect} from 'react';
import {Navigate} from 'react-router-dom';



export function ProtectedRoute({ children }) {
  const userStorage = sessionStorage.getItem('token');
    const[ user,setUser] = useState(userStorage)
    useEffect(() => {
      setUser(userStorage);
      
    }, [])
    

    /* Colocar otra vez el signo de Admiracion para validacion de login*/
    if(!user) return <Navigate to='/auth' />
    return(
      <>
       <div className='w-full h-full'>{children}</div> 
      </>
    ) 

}