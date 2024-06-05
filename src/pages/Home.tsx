import React, {
    FC,
    useContext,
    useEffect,
} from "react";
import { MessagesList, NavBar } from "../components";
import ChatList from "../components/Chat/ChatList";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import { initializeSocket } from "../API/socket";

const AppWrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;

const NoChatWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const NoChatDiv = styled.div`
    color: #38405f;
    width: 400px;
    height: 60px;
    background-color: #d4dce6;
    text-align: center;
    padding: 20px 44px;
    border-radius: 40px;
`;

interface HomeProps {
    isSelectChat: boolean;
}

const Home: FC<HomeProps> = ({ isSelectChat }) => {
    initializeSocket();

    useEffect(() => {
        console.log(isAuth);
    },);

    const { isAuth, setIsAuth } = useContext(AuthContext);

    return (
        <div>
            {isAuth ? (
                <AppWrapper>
                    <NavBar />
                    <MessagesList />
                    {isSelectChat ? (
                        <ChatList />
                    ) : (
                        <NoChatWrapper>
                            <NoChatDiv>
                                Select a chat to start messaging
                            </NoChatDiv>
                        </NoChatWrapper>
                    )}{" "}
                    :{" "}
                </AppWrapper>
            ) : (
                <Navigate to="/auth/login" replace={true} />
            )}
        </div>
    );
};

export default Home;
