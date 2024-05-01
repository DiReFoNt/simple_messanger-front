import React, { createContext } from "react";
import { Interface } from "readline";

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
