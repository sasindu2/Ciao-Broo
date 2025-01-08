import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const isLoggedIn = !!getAuthToken();

    if (!isLoggedIn) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export const getAuthToken = () => {
    const authData = localStorage.getItem("authToken");
    if (!authData) return null;
    const { token, expiresAt } = JSON.parse(authData);
    if (new Date().getTime() > expiresAt) {
        localStorage.removeItem("authToken");
        return null;
    }
    return token;
};


export const setAuthToken = (token) => {
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    const authData = {
        token,
        expiresAt: expirationTime,
    };
    localStorage.setItem("authToken", JSON.stringify(authData));
};



