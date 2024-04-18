import { useState, useEffect } from "react";
import { BiCalendarWeek } from "react-icons/bi";

const AgendaMedica = () => {
    return (
        <div className="h-full border rounded-md gap-5 m-2 mr-0">
            <div className="w-full h-max bg-sky-700 flex items-center justify-between gap-1 text-white text-md font-semibold rounded-t-md p-3">
                <div className="flex items-center gap-1">
                    <BiCalendarWeek />
                    <h1 className="">Agenda Medica</h1>
                </div>
            </div>
        </div>
    )
};

export default AgendaMedica;