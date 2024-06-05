import React, { FC, useContext, useEffect, useState } from "react";
import { ButtonWrapper } from "../../styles";
import { Icons } from "../../assets";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import { IUser } from "../../types/types";
import { socket } from "../../API/socket";
import ApiService from "../../API/ApiService";

const NavBarWrapper = styled.div`
    min-width: 112px;
    background-color: #d4dce6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 40px;
`;

const Title = styled.div`
    margin-top: 100px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 132px;
`;

const NavBar: FC = () => {
    const navigate = useNavigate();
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const [userPersonal, setUserPersonal] = useState<IUser>();

    useEffect(() => {
        ApiService.fetchUserPersonal().then((res) => {
            setUserPersonal(res.data);
        });
    }, []);

    return (
        <NavBarWrapper>
            <Title>{userPersonal?.username}</Title>
            <Content>
                <ButtonWrapper
                    onClick={() => {
                        console.log("DarkMode");
                    }}
                >
                    <Icons.DarkMode />
                </ButtonWrapper>
                <ButtonWrapper
                    onClick={() => {
                        navigate("/auth/login");
                        setIsAuth(false);
                        localStorage.removeItem("users");
                        localStorage.clear();
                        socket.close();
                    }}
                >
                    <Icons.LogOut />
                </ButtonWrapper>
            </Content>
        </NavBarWrapper>
    );
};

export { NavBar };
