import React from "react";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("token"));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!Cookies.get("token"));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    });

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
