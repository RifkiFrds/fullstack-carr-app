//import useContext
import React, { useContext } from 'react';

//import context
import { AuthContext } from '../contexts/AuthContext';

//import react router dom
import { Routes, Route, Navigate } from "react-router-dom";

//import view home
import Home from "../pages/public/Home.jsx";

//import view register
import Register from "../pages/public/Register.jsx";

//import view login
import Login from "../pages/public/Login.jsx";

export default function AppRoutes() {

    //destructure context "isAuthenticated"
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Routes>
            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/register" */}
            <Route path="/register" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register />
            } />

            {/* route "/login" */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />
            } />
        </Routes>
    );
}
