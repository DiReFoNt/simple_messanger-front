import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/Login/SignIn";
import SignUp from "../pages/Login/SignUp";

const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
            <Route path="/home" element={<Home isSelectChat={false} />} />
            <Route
                path="/home/private/:username"
                element={<Home isSelectChat={true} />}
            />
            <Route path="/auth/login" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
    );
};

export default AppRouter;
