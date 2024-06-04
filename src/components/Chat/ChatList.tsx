import React, { FC, useEffect, useRef, useState } from "react";
import List from "../List";
import ChatItem from "./ChatItem";
import styled from "styled-components";
import { IChatPrivate } from "../../types/types";
import { useParams } from "react-router-dom";
import { Icons } from "../../assets";
import { config, tokenAccess } from "../../assets/Global/UserData";
import axios from "axios";
import { Links } from "../../router/links";
import { sendMessage, socket } from "../../socket";

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
    min-width: 275px;
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

const ChatListMessages = styled.div`
    overflow: auto;
    max-height: 85%;
    &::-webkit-scrollbar {
        width: 10px;
        height: 20px;
        background-color: red;
    }
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #000000;
        border: 2px solid #555555;
    }
`;

const ChatList: FC = () => {
    const params = useParams();
    const [dataChat, setDataChat] = useState<IChatPrivate | null>(null);
    const [msg, setMsg] = useState<string>();
    const receiver_id = localStorage.getItem("receiver_id");
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetch() {
            await fetchMsgData();
        }
        fetch();
    }, [params]);

    useEffect(() => {
        if (dataChat && dataChat.messages.length > 0 && chatRef.current) {
            chatRef.current.scrollTo(0, 9999);
        }
    }, [dataChat]);

    const fetchMsgData = async () => {
        await axios
            .get(Links.privateMsgHistory + receiver_id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "access_token"
                    )}`,
                },
            })
            .then((res) => {
                setDataChat(res.data);
            })
            .catch((err) => alert("error"));
    };

    return (
        <ChatListWrapper>
            <ChatListHeader>
                <ChatListHeaderUser>
                    <ChatListHeaderName>{params.username}</ChatListHeaderName>
                    <ChatListHeaderStatus>Online</ChatListHeaderStatus>
                </ChatListHeaderUser>
            </ChatListHeader>
            {!!dataChat ? (
                <ChatListMessages ref={chatRef}>
                    {dataChat.messages
                        .sort((a, b) => a.private_msg_id - b.private_msg_id)
                        .map((msg) => {
                            return (
                                <ChatItem
                                    msg={msg.msg}
                                    time={msg.time}
                                    users={msg}
                                    key={msg.private_msg_id}
                                />
                            );
                        })}
                </ChatListMessages>
            ) : (
                <div></div>
            )}
            <ChatForm
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage("private_message", {
                        msg: msg,
                        receiver_id: receiver_id,
                    });
                    fetchMsgData();
                    setMsg("");
                }}
            >
                <ChatFormInput
                    type="text"
                    onChange={(e) => {
                        setMsg(e.target.value);
                    }}
                    value={msg}
                    placeholder="Write a message..."
                />
                <ChatFormButton>
                    <Icons.Send />
                </ChatFormButton>
            </ChatForm>
        </ChatListWrapper>
    );
};

export default ChatList;
