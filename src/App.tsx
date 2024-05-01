import { MessagesList, NavBar, SignIn } from "./components";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/Login/SignUp";
import { AuthContext } from "./context";

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setIsAuth(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/auth/login" element={<SignIn />} />
                    <Route path="/auth/signup" element={<SignUp />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
