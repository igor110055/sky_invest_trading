import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router";

//Routes
import { allRoutes } from "./DataRoutes";

//Layouts
import MainLayout from "@layouts/MainLayout";
import InvestorLayout from "@layouts/InvestorLayout";
import AuthLayout from "@layouts/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { me } from "../store/user/user.api";

const AppRoutes = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isTraider, user, isAuth } = useSelector((state) => state.user);
    const [routes, setRoutes] = useState([]);
    const { mains, investor, traider } = allRoutes;

    useEffect(() => {
        dispatch(me());
    }, [isAuth]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (user || token) {
            if (isTraider) {
                setRoutes([...mains, ...traider]);
            } else {
                setRoutes([...mains, ...investor]);
            }
        } else {
            setRoutes([...mains]);
        }
    }, [user]);

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollTop();
    }, [location.pathname]);

    useEffect(() => {
        scrollTop();
    }, []);

    return (
        <Routes>
            {routes.map((route) => {
                let routeInner;
                let props = route;

                switch (route.layout) {
                    case "main":
                        routeInner = (
                            <MainLayout {...props}>
                                <route.component />
                            </MainLayout>
                        );
                        break;
                    case "investor":
                        routeInner = (
                            <InvestorLayout {...props}>
                                <route.component />
                            </InvestorLayout>
                        );
                        break;
                    case "auth":
                        routeInner = (
                            <AuthLayout {...props}>
                                <route.component />
                            </AuthLayout>
                        );
                        break;
                    default:
                        break;
                }

                return (
                    <Route
                        path={route.url}
                        key={route.url}
                        element={routeInner}
                    />
                );
            })}
        </Routes>
    );
};

export default AppRoutes;
