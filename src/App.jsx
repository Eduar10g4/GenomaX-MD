import { useState } from 'react'
import './App.css'
import Sidebar from './sidebar/sidebar'
import fondo from './assets/fondo.png';

function App() {

  return (
    <>
      <div className='w-full h-full' style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover'}}>
        <Sidebar />
      </div>
    </>
  )
}

export default App
