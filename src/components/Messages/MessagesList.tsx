import React, { FC, useEffect, useState } from "react";
import List from "../List";
import { IUser } from "../../types/types";
import { MessageItem } from "./MessageItem";
import styled from "styled-components";
import { InputWrapper } from "../../styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Links } from "../../router/links";
import { config } from "../../assets/Global/UserData";

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
    const userPersonalId = localStorage.getItem("user_id");

    useEffect(() => {
        async function fetch() {
            await axios
                .get(Links.usersMessenges, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    setUsers(res.data);
                });
        }
        fetch();
    }, []);

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
                {users ? (
                    searchQuery.length > 0 && searchResult.length === 0 ? (
                        <ListNotFound>Not Found</ListNotFound>
                    ) : (
                        <List
                            items={
                                searchResult.length === 0 ? users : searchResult
                            }
                            renderItem={(user: IUser) => {
                                if (`${user.user_id}` === userPersonalId) {
                                    return;
                                }
                                return (
                                    <MessageItem
                                        key={user.user_id}
                                        user={user}
                                        onClick={() => {
                                            navigate(
                                                `/home/private/${user.username}`,
                                                { replace: true }
                                            );
                                            localStorage.setItem(
                                                "receiver_id",
                                                `${user.user_id}`
                                            );
                                        }}
                                    ></MessageItem>
                                );
                            }}
                        ></List>
                    )
                ) : (
                    "Loading..."
                )}
            </ListWrapper>
        </MessageListWrapper>
    );
};

export { MessagesList };
