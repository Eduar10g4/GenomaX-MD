import { useState } from 'react'
import './App.css'
//import Sidebar from './sidebar/sidebar'
//import fondo from './assets/fondo.png';
import Login from './components/login/login';
import Dashboard from './pages/Dashboard';
import LayoutDashboard from './components/layout/layouthDashboard';
import CalendarMd from './components/CitasMedica/calendar';

function App() {

  return (
    <>
      <div className='w-full h-full'>
        <Login />
       {/** <CalendarMd /> */}
      </div>
    </>
  )
}

export default App
