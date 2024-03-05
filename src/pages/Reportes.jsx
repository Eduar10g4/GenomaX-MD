import { Link } from "react-router-dom";


const Reportes = () => {
  return (
  <>
    <div  className="w-full h-[84vh] sm:h-[100vh] pt-[20px] sm:pt-[0px] bg-white grid place-items-center ">
      <div className=" w-5/6 relative -top-[15px] sm:top-14 text-[35px]">Reportes</div>
      <div className=" backdrop-blur w-5/6 2xl:h-full relative -top-[18px] sm:-top-[0px] 2xl:top-[-60px]  p-10" style={{background: "rgba(132, 223, 71, 0.363)", boxShadow: "0.3px 4px 4px 1px rgba(0,0,0,0.27)",}}>
        {/* Inicio Compoente de modulo de reportes*/}
        <div className="w-[230px] h-[350px] bg-white rounded shadow-lg">
          <div className="p-4">Titulo Modulo</div>
          <hr className=" relative top-[-10px]"></hr>
          <p className=" p-4 text-xs">Configura la información que se mostrará en tus facturas.</p>
          <ol className="p-4">
            <li className="text-xs border-b-[2px] mb-2 cursor-pointer hover:bg-lime-200"><Link to="/reportes/reporte">Programacion de Citas Usuario</Link></li>
            <li className="text-xs border-b-[2px] mb-2 cursor-not-allowed hover:bg-slate-300">Reporte en espera</li>
            <li className="text-xs border-b-[2px] mb-2 cursor-not-allowed hover:bg-slate-300">Reporte en espera</li>
            <li className="text-xs border-b-[2px] mb-2 cursor-not-allowed hover:bg-slate-300">Reporte en espera</li>
            <li className="text-xs border-b-[2px] mb-2 cursor-not-allowed hover:bg-slate-300">Reporte en espera</li>
            <li className="text-xs border-b-[2px] mb-2 cursor-not-allowed hover:bg-slate-300">Reporte en espera</li>
          </ol>
        </div>
        {/* Fin Compoente de modulo de reportes*/}
      </div>
    </div>
  </> 
  );
};

export default Reportes;
