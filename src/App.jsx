import React from "react";
import { Routes, Route } from 'react-router-dom';
import routesConfig from "./routes/routesConfig";
import Header from "./components/Header/Header";

export default function App(){
    return(
        <>
        <Header />
        <Routes>
            {routesConfig.map((route, index) => (
            <Route 
            key = {index}
            path= {route.path}
            exact = {route.exact}
            element={<route.element />}
            />
        ))}
        </Routes>
      
    </>

    )
}