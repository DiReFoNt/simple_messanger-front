import React, { FC } from "react";
import styled from "styled-components";
import { IMessagePrivate } from "../../types/types";

const ChatItemWrapper = styled.div`
    margin: 36px;
    min-height: 70px;
    min-width: 370px;
    max-width: 100%;
    position: relative;
`;

const ChatItemNotUser = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    color: #747c92;
    position: absolute;
`;

const ChatItemUser = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    color: #747c92;
    position: absolute;
    right: 0;
`;

const ChatItemUserName = styled.div`
    color: black;
`;

const ChatItemMsgNotUser = styled.div`
    background-color: #d4dce6;
    padding: 12px 16px;
    border-radius: 0px 25px 25px 25px;
    color: #38405f;
`;

const ChatItemMsgUser = styled.div`
    background-color: #f4f4f7;
    padding: 12px 16px;
    border-radius: 24px 0 24px 24px;
    color: #38405f;
`;

interface ChatItemProps {
    msg: string;
    time: string;
    users: IMessagePrivate;
}

const ChatItem: FC<ChatItemProps> = ({ msg, time, users }) => {
    const date = new Date(time);
    const user_id = Number(localStorage.getItem("user_id"));
    // console.log(users);

    return (
        <ChatItemWrapper>
            {user_id === users.receiver.user_id ? (
                <ChatItemNotUser>
                    <div>
                        {date.getHours()}:{date.getMinutes()}
                        <ChatItemMsgNotUser>{msg}</ChatItemMsgNotUser>
                    </div>
                </ChatItemNotUser>
            ) : (
                <ChatItemUser>
                    <div>
                        {date.getHours()}:{date.getMinutes()}
                        <ChatItemMsgUser>{msg}</ChatItemMsgUser>
                    </div>
                </ChatItemUser>
            )}
        </ChatItemWrapper>
    );
};

export default ChatItem;
