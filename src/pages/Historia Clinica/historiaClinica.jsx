import React from "react";
import { IoIosPaper } from "react-icons/io";

const HistoriaClinica = () => {
  return (
    <>
      {/*Contenedor Principal*/}
      <div className="w-full">
        <div
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            WebkitBackdropFilter: "blur(9.5px)",
            backdropFilter: "blur(9.5px)",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
          className="w-full flex pl-[10px] items-center h-[40px] border shadow-2xl bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg backdrop-contrast-125 backdrop-brightness-125 backdrop-opacity-75 border-opacity-75 rounded-md border-solid border-white border-1"
        >
          <IoIosPaper className="text-lime-700 mt-1 text-[24px]" />
          <h1 className="text-lime-800 pl-[3px] text-[24px]">
            Historia clínica
          </h1>
        </div>
      </div>
    </>
  );
};

export default HistoriaClinica;
