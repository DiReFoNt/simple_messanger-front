import React, { FC, useEffect, useState } from "react";
import List from "../List";
import { IUser } from "../../types/types";
import { MessageItem } from "./MessageItem";
import styled from "styled-components";
import { InputWrapper } from "../../styles";
import { useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { Links } from "../../router/links";

const MessageListWrapper = styled.div`
    min-width: 408px;
    background-color: #f4f4f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: scroll;
    &::-webkit-scrollbar {
        width: 1px;
    }
`;

const ListWrapper = styled.div`
    margin-top: 80px;
`;

const ListNotFound = styled.div`
    margin-top: 25px;
    font-size: 20px;
`;

const MessagesList: FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchUsers = async () => {
        await axios
            .get(Links.usersMessenges, config)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => alert("error"));
    };

    const [searchResult, setSearchResult] = useState<IUser[]>([]);

    const [searchQuery, setSearchQuery] = useState<string>("");

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        let filteredResults: IUser[] = [];
        if (e.target.value.toLowerCase() === "") {
            filteredResults = users;
        } else {
            filteredResults = users.filter((user) => {
                return user.username
                    .toLowerCase()
                    .startsWith(e.target.value.toLowerCase());
            });
        }
        setSearchResult(filteredResults);
    };

    return (
        <MessageListWrapper>
            <InputWrapper
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={inputHandler}
            />

            <ListWrapper>
                {searchQuery.length > 0 && searchResult.length === 0 ? (
                    <ListNotFound>Not Found</ListNotFound>
                ) : (
                    <List
                        items={searchResult.length === 0 ? users : searchResult}
                        renderItem={(user: IUser) => {
                            return (
                                <MessageItem
                                    key={user.user_id}
                                    user={user}
                                    onClick={() => {
                                        navigate(
                                            `/home/private/${user.username}`,
                                            { replace: true }
                                        );
                                    }}
                                ></MessageItem>
                            );
                        }}
                    ></List>
                )}
            </ListWrapper>
        </MessageListWrapper>
    );
};

export { MessagesList };
