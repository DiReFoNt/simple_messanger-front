import React, { createContext } from "react";

export type ContainerProps = {
    children: React.ReactNode;
};

type TypeAuthContextType = {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};
const typeAuthContextState = {
    isAuth: false,
    setIsAuth: () => {},
};

export const AuthContext =
    createContext<TypeAuthContextType>(typeAuthContextState);

export type ThemeProps = {
    children: React.ReactNode;
};

type TypeThemeType = {
    theme: string | (() => void);
    themeToggler: React.Dispatch<React.SetStateAction<string>>;
};
const typeThemeState = {
    theme: "light",
    themeToggler: () => {},
};

export const ThemeContext = createContext<TypeThemeType>(typeThemeState);
