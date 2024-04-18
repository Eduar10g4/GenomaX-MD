import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from '../App';
import Option1 from '../pages/Agenda/Option1';
import Dashboard from '../pages/Dashboard';
import LayoutDashboard from '../components/layout/layouthDashboard';
import HistoriaClinica from '../pages/Historia Clinica/historiaClinica';
import ProtectLayout from '../components/otros/protectLayouth';
import MisCitas from '../pages/Agenda/Option2';
import Option3 from '../pages/Agenda/Option3';
import AgendaMedica from '../components/CitasMedica/AgendaMedica/AgendaMedica';
//import { ProtectedRoute } from '../components/protectedRoute/protectedRoute';

//const isAuthenticated = false; // Aquí debes implementar tu lógica de autenticación

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectLayout><Dashboard /></ProtectLayout>} />
          <Route path="/agenda/agendamiento" element={<ProtectLayout><Option1 /></ProtectLayout>} />
          <Route path="/agenda/agenda-medica" element={<ProtectLayout><AgendaMedica /></ProtectLayout>} />
          <Route path="/agenda/citas" element={<ProtectLayout><MisCitas /></ProtectLayout>} />
          <Route path="/atencion/option1" element={<ProtectLayout><HistoriaClinica /></ProtectLayout>} />
          <Route path="/auth" element={<App />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router;
