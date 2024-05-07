import React, { useState } from "react";
import { routes } from "./dataSidebar";
import { Link } from "react-router-dom";
import favicon from "../../assets/img/favicon.ico"
import { IoIosArrowForward } from "react-icons/io";
import { RiMenuFoldFill, RiArrowLeftSLine } from "react-icons/ri";
//import Navbar from "../components/navbar/navbar";

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [open, setOpen] = useState(false);

    const handleItemClick = (index) => {
        const route = routes[index];

        if (!open && route.subRoutes) {
            setOpen(true);
            setActiveIndex(index);
        } else if (open && route.subRoutes) {
            setActiveIndex(index === activeIndex ? null : index);
        } else {
            setActiveIndex(index);
        }
    };


    return (
        <div className={`flex flex-col h-full rounded-br-lg shadow-md shadow-gray-800 text-gray-100 backdrop-blur-sm transition-width duration-300 ${!open ? 'w-20' : 'w-56'}`} style={{ background: "#3899d566" }}>
            <div className="w-full flex items-center justify-end absolute left-[13px] top-4">
                <button onClick={() => setOpen(!open)} className="w-3 h-[34px] bg-opacity-25 backdrop-filter backdrop-blur-md bg-white bg-opacity-60 shadow-lg border border-gray-100 border-opacity-25 rounded-r-lg text-gray-600">
                    <RiArrowLeftSLine className={`relative right-2 text-2xl ${!open ? 'rotate-180' : ''}`} />
                </button>
            </div>
            <div className={`flex items-center justify-center gap-2 py-4 pr-4 ${!open ? 'px-4' : ''}`}>
                <img src={favicon} alt="" className={`w-11 h-11 ${!open ? '' : ''}`} />
                <p className={`text-[20px] font-medium ${!open ? 'hidden' : ''}`}>GenomaX</p>
            </div>
            {
                routes.map((route, index) => (
                    <div key={index}>
                        <div
                            className={`py-2 px-4 cursor-pointer hover:bg-gray-600 ${!open ? 'text-center' : ''}`}
                            onClick={() => { handleItemClick(index) }}
                        >
                            <Link to={route.path} className="">
                                <div className={`w-max flex items-center gap-2 ${!open ? 'relative left-3' : ''} ${location.pathname === route.path ? 'text-emerald-500' : ''} ${location.pathname === route.path && !open ? 'pl-0' : ''}`}>
                                    <div className={`${!open ? ' text-xl' : ''}`}>{route.icon}</div>
                                    <span className={` ${!open ? 'opacity-0' : 'transition-opacity duration-300 opacity-100'}`}>{route.name}</span>
                                </div>
                            </Link>
                        </div>
                        {activeIndex === index && route.subRoutes && (
                            <ul className={`transition-height duration-300 ${!open ? 'h-0' : ''}`}>
                                {route.subRoutes.map((subRoute, subIndex) => (
                                    <li key={subIndex} className="">
                                        <Link
                                            to={subRoute.path}
                                            className={`flex items-center py-2 px-8 hover:bg-gray-600 ${location.pathname === subRoute.path ? 'text-emerald-500' : ''}`}
                                        >
                                            <div className="mr-3">{subRoute.icon}</div>
                                            <span>{subRoute.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))
            }
        </div>
    );
};

export default Sidebar;
