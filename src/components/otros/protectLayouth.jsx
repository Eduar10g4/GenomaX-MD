import React from 'react'
import { ProtectedRoute } from '../protectedRoute/protectedRoute'
import LayoutDashboard from '../layout/layouthDashboard'


const ProtectLayout = ({children}) => {
  return (
    <ProtectedRoute>
        <LayoutDashboard>
              {children}               
        </LayoutDashboard>
    </ProtectedRoute>
  )
}

export default ProtectLayout;