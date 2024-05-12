import React, { FC, useState } from "react";
import List from "../List";
import ChatItem from "./ChatItem";
import styled from "styled-components";
import { IChatPrivate } from "../../types/types";
import { useParams } from "react-router-dom";
import { Icons } from "../../assets";

const ChatListWrapper = styled.div`
    width: 100%;
    position: relative;
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

const ChatListHeaderStatus = styled.div`
    color: green;
`;

const ChatListHeaderName = styled.div`
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 10px;
`;

const ChatForm = styled.form`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70px;
    background-color: #f4f4f7;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 10px 20px;
`;

const ChatFormInput = styled.input`
    width: 100%;
    padding: 6px;
    background-color: #f4f4f7;
    border: none;
    outline: none;
    font-weight: 400;
    font-size: 22px;
    line-height: 73%;
    &::-webkit-input-placeholder {
        color: #747c92;
    }
`;

const ChatFormButton = styled.button`
    width: 30px;
    height: 30px;
    margin-left: 10px;
    background-color: #f4f4f7;
    border: none;
    cursor: pointer;
`;

const ChatList: FC = () => {
    const params = useParams();
    const [dataChat, setDataChat] = useState<IChatPrivate | null>(null);

    return (
        <ChatListWrapper>
            <ChatListHeader>
                <ChatListHeaderUser>
                    <ChatListHeaderName>{params.username}</ChatListHeaderName>
                    <ChatListHeaderStatus>Online</ChatListHeaderStatus>
                </ChatListHeaderUser>
            </ChatListHeader>
            {!!dataChat ? (
                <List
                    items={dataChat.messages}
                    renderItem={(msg) => {
                        return (
                            <ChatItem
                                msg={msg.msg}
                                time={msg.time}
                                // user={params.username}
                                key={msg.private_msg_id}
                            />
                        );
                    }}
                ></List>
            ) : (
                <div></div>
            )}
            {/* <List
                items={dataChat.messages}
                renderItem={(msg) => {
                    return (
                        <ChatItem
                            msg={msg.msg}
                            time={msg.time}
                            // user={params.username}
                            key={msg.private_msg_id}
                        />
                    );
                }}
            ></List> */}
            <ChatForm>
                <ChatFormInput
                    type="text"
                    onChange={(e) => {}}
                    value={""}
                    placeholder="Write a message..."
                />
                <ChatFormButton
                    onClick={(e) => {
                        e.preventDefault();
                        console.log("send msg");
                    }}
                >
                    <Icons.Send />
                </ChatFormButton>
            </ChatForm>
        </ChatListWrapper>
    );
};

export default ChatList;
