import React from "react";

//Style
import "./App.scss";

//Layouts
// import MainLayout from "@layouts/MainLayout";
import AppRoutes from "./routes";

const App = () => {
    return (
        <div className="App">
            <AppRoutes />
        </div>
    );
};

export default App;
