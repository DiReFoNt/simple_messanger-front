import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthContext, ThemeContext } from "./context";
import { tokenAccess } from "./assets/Global/UserData";
import AppRouter from "./components/AppRouter";
import { useDarkMode } from "./hooks/useDarkMode";
import { darkTheme, lightTheme } from "./styles/themes";
import { ThemeProvider } from "styled-components";

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [theme, themeToggler] = useState<string>("light");
    const themeMode = theme === "light" ? lightTheme : darkTheme;
    useEffect(() => {
        if (tokenAccess) {
            setIsAuth(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <ThemeContext.Provider value={{ theme, themeToggler }}>
                <ThemeProvider theme={themeMode}>
                    <BrowserRouter>
                        <AppRouter />
                    </BrowserRouter>
                </ThemeProvider>
            </ThemeContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
