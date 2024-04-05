import React, { useState } from 'react';
//import Navbar from '../navbar/Navbar';
//import Wizard from '../wizard/Wizard';
//import fondo from '../assets/fondo.png';
//import medical from '../assets/Medical_3.jpeg'
import DashboardMd from '../../dashboard';
import Sidebar from '../sidebar/sidebar';
import Navbar from '../navbar/navbar';


const LayoutDashboard = ({ children }) => {
    // const [isWizard, setIsWizard] = useState(true)

    return (
        <div className="w-full h-screen flex">
            <Sidebar />
            <div className="w-full h-full">
                <Navbar />
               <div className='w-full h-full overflow-y-auto'>{children}</div> 
            </div>
        </div>
    )
}

export default LayoutDashboard;