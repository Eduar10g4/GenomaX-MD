import React, { useState } from "react";
import { routes } from "./dataSidebar";
import { Link } from "react-router-dom";
import favicon from "../../assets/img/favicon.ico"
import { IoIosArrowForward } from "react-icons/io";
import { RiMenuFoldFill } from "react-icons/ri";
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
        <div className={`min-w-56 h-full flex flex-col rounded-br-lg shadow-md shadow-gray-800 text-gray-100 backdrop-blur-sm ${!open ? 'min-w-max' : ''}`} style={{ background: "#3899d566" }}>
            <button className="p-4 pb-0" onClick={() => setOpen(!open)}><RiMenuFoldFill className={`h-6 w-6 ${!open ? 'rotate-180' : ''}`} /></button>
            <div className={`flex items-center justify-center gap-2 py-4 pr-4 ${!open ? 'px-4' : ''}`}>
                <img src={favicon} alt="" className={`w-11 h-11 ${!open ? '' : ''}`} />
                <p className={`text-[20px] font-medium ${!open ? 'hidden' : ''}`}>GenomaX</p>
            </div>
            {
                routes.map((route, index) => (
                    <div key={index}>
                        <div
                            className="py-2 px-4 cursor-pointer hover:bg-gray-600"
                            onClick={() => { handleItemClick(index) }}
                        >
                            <Link to={route.path}>
                                <div className={`flex items-center gap-2 ${!open ? 'justify-center' : ''} ${location.pathname === route.path ? 'text-emerald-500' : ''} ${location.pathname === route.path && !open ? 'pl-0' : ''}`}>
                                    <div className={`${!open ? 'text-xl' : ''}`}>{route.icon}</div>
                                    <span className={`${!open ? 'hidden' : ''}`}>{route.name}</span>
                                </div>
                            </Link>
                        </div>
                        {activeIndex === index && route.subRoutes && (
                            <ul className={`${!open ? 'hidden' : ''}`}>
                                {route.subRoutes.map((subRoute, subIndex) => (
                                    <li key={subIndex}>
                                        <Link
                                            to={subRoute.path}
                                            className={`flex items-center py-2 px-8 hover:bg-gray-600 ${location.pathname === subRoute.path ? 'text-emerald-500' : ''}`}
                                        >
                                            <div className="mr-4">{subRoute.icon}</div>
                                            <span>{subRoute.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))
            }
        </div >
    );
};

export default Sidebar;
