import React, { useState } from 'react';
//import Navbar from '../navbar/Navbar';
//import Wizard from '../wizard/Wizard';
import fondo from '../assets/fondo.png';
import medical from '../assets/Medical_3.jpeg'
import DashboardMd from '../dashboard';


const LayoutDashboard = ({ children }) => {
   // const [isWizard, setIsWizard] = useState(true)

    return (
        <div className='w-full h-full'>
            {/**  {isWizard ? <Wizard estado={setIsWizard} /> : null}  */}
            <DashboardMd>
              <div className='w-full h-full'>{children}</div>  
            </DashboardMd>

        </div>
    )
}

export default LayoutDashboard;