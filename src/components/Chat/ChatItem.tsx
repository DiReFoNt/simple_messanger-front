import React, { FC } from "react";
import styled from "styled-components";

const ChatItemWrapper = styled.div`
    margin: 36px;
    min-height: 70px;
    min-width: 370px;
    max-width: 410px;
`;

const ChatItemUser = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    color: #747c92;
`;

const ChatItemUserName = styled.div`
    color: black;
`;

const ChatItemMsg = styled.div`
    background-color: #d4dce6;
    padding: 12px 16px;
    border-radius: 0px 25px 25px 25px;
    color: #38405f;
`;

interface ChatItemProps {
    msg: string;
    time: string;
    // user: string | undefined;
}

const ChatItem: FC<ChatItemProps> = ({ msg, time }) => {
    const date = new Date(time);

    return (
        <ChatItemWrapper>
            <ChatItemUser>
                <div>
                    {date.getHours()}:{date.getMinutes()}
                </div>
            </ChatItemUser>

            <ChatItemMsg>{msg}</ChatItemMsg>
        </ChatItemWrapper>
    );
};

export default ChatItem;
