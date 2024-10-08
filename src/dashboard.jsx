import React from "react";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";

const DashboardMd = (props) => {
    return(
        <div className="w-full h-full flex">
            <Sidebar />
            <div className="w-full h-full">
                <Navbar />
                {props.children}
            </div>
        </div>
    )
}

export default DashboardMd