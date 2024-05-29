import React, { FC, useEffect, useState } from "react";
import List from "../List";
import ChatItem from "./ChatItem";
import styled from "styled-components";
import { IChatPrivate } from "../../types/types";
import { useParams } from "react-router-dom";
import { Icons } from "../../assets";
import { socket } from "../../socket";
import { config, tokenAccess } from "../../router/config";
import axios from "axios";
import { Links } from "../../router/links";

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

const ChatList: FC = () => {
    const params = useParams();
    const [dataChat, setDataChat] = useState<IChatPrivate | null>(null);
    const [msg, setMsg] = useState<string>();
    const receiver_id = localStorage.getItem("receiver_id");

    useEffect(() => {
        async function fetch() {
            const res = await fetchMsgData();
        }
        fetch();
    }, [params]);

    const fetchMsgData = async () => {
        await axios
            .get(Links.privateMsgHistory + receiver_id, config)
            .then((res) => {
                setDataChat(res.data);
                console.log(dataChat);
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
                <div style={{ overflow: "auto", maxHeight: "85%"}}>
                    {dataChat.messages.reverse().map((msg) => {
                        return (
                            <ChatItem
                                msg={msg.msg}
                                time={msg.time}
                                users={msg}
                            />
                        );
                    })}
                </div>
            ) : (
                <div></div>
            )}
            <ChatForm>
                <ChatFormInput
                    type="text"
                    onChange={(e) => {
                        setMsg(e.target.value);
                    }}
                    value={msg}
                    placeholder="Write a message..."
                />
                <ChatFormButton
                    onClick={(e) => {
                        e.preventDefault();
                        const msgData = JSON.stringify({
                            event: "private_message",
                            data: {
                                msg: msg,
                                receiver_id: receiver_id,
                            },
                        });
                        socket.send(msgData);
                    }}
                >
                    <Icons.Send />
                </ChatFormButton>
            </ChatForm>
        </ChatListWrapper>
    );
};

export default ChatList;
