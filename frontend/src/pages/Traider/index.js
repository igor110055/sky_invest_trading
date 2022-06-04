import React from "react";

//Components
import Sidebar from "@components/TraiderComponents/SideBar";

//Styles
import "./Traider.scss";

const Traider = React.memo(() => {
    return (
        <div className="traider">
            <Sidebar />
        </div>
    );
});

export default Traider;
