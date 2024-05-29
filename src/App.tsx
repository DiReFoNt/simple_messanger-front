import { MessagesList, NavBar, SignIn } from "./components";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/Login/SignUp";
import { AuthContext } from "./context";
import ChatList from "./components/Chat/ChatList";
import { socket } from "./socket";
import { tokenAccess } from "./router/config";

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
                    <Route
                        path="*"
                        element={<Navigate to="/auth/login" replace />}
                    />
                    <Route
                        path="/home"
                        element={<Home isSelectChat={false} />}
                    />
                    <Route
                        path="/home/private/:username"
                        element={<Home isSelectChat={true} />}
                    />
                    <Route path="/auth/login" element={<SignIn />} />
                    <Route path="/auth/signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
