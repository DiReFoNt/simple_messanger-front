import React, { FC, useState } from "react";
import List from "../List";
import ChatItem from "./ChatItem";
import styled from "styled-components";
import { IChatPrivate } from "../../types/types";

const ChatListWrapper = styled.div`
    width: 100%;
`;

const ChatListHeader = styled.div`
    width: 100%;
    height: 96px;
    background-color: #f4f4f7;
    color: #38405f;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
`;

const ChatListHeaderUser = styled.div``;

const ChatListHeaderName = styled.div`
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 10px;
`;

const ChatList: FC = () => {
    const [dataChat, setDataChat] = useState<IChatPrivate>({
        page: 1,
        perPage: 20,
        total: 26,
        messages: [
            {
                private_msg_id: 26,
                msg: "Anytime! Let's make magic happen",
                time: "2024-04-06T11:08:03.632Z",
                sender: {
                    user_id: 3,
                    username: "Oleksii",
                },
                receiver: {
                    user_id: 2,
                    username: "zamazz",
                },
            },
            {
                private_msg_id: 25,
                msg: "That sounds great! I agree, let's focus on the design first. I have a few ideas for the layout and color scheme.",
                time: "2024-04-06T11:08:03.479Z",
                sender: {
                    user_id: 3,
                    username: "Oleksii",
                },
                receiver: {
                    user_id: 2,
                    username: "zamazz",
                },
            },
        ],
    });



    return (
        <ChatListWrapper>
            <ChatListHeader>
                <ChatListHeaderUser>
                    <ChatListHeaderName>
                        {dataChat.messages[0].sender.username}
                    </ChatListHeaderName>
                    <div>Online</div>
                </ChatListHeaderUser>
            </ChatListHeader>
            <List
                items={dataChat.messages}
                renderItem={(msg) => {
                    return (
                        <ChatItem
                            msg={msg.msg}
                            time={msg.time}
                            user={msg.sender}
                            key={msg.private_msg_id}
                        />
                    );
                }}
            ></List>
            {/* <form>
                <input
                    type="text"
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    value={message}
                />
                <button onSubmit={sendMessage}>Send</button>
            </form> */}
        </ChatListWrapper>
    );
};

export default ChatList;
