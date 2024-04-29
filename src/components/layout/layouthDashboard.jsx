import React, { useState } from 'react';
//import Navbar from '../navbar/Navbar';
//import Wizard from '../wizard/Wizard';
import fondo from '../../assets/img/fondo.png';
//import medical from '../assets/Medical_3.jpeg'
import DashboardMd from '../../dashboard';
import Sidebar from '../sidebar/sidebar';
import Navbar from '../navbar/navbar';


const LayoutDashboard = ({ children }) => {
    // const [isWizard, setIsWizard] = useState(true)

    return (
        <div className="w-full h-screen flex bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
            <Sidebar />
            <div className="w-full h-full relative">
              <div className='w-full absolute z-50'><Navbar /></div>
               <div className='w-full mt-[60px] h-[85%]'>{children}</div> 
            </div>
        </div>
    )
}

export default LayoutDashboard;