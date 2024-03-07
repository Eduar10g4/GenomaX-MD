import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from '../App';
import Option1 from '../pages/Agenda/Option1';
import Dashboard from '../pages/Dashboard';
import LayoutDashboard from '../layout/layouthDashboard';
import HistoriaClinica from '../pages/Historia Clinica/historiaClinica';



const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutDashboard><Dashboard /></LayoutDashboard>} />
                <Route path="/agenda/agenda-medica" element={<LayoutDashboard><Option1 /></LayoutDashboard>} />
                <Route path="/atencion/option1" element={<LayoutDashboard><HistoriaClinica /></LayoutDashboard>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
