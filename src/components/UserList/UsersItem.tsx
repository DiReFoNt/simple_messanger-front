import React, { FC } from "react";
import { IUser } from "../../types/types";
import styled from "styled-components";

const UserWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 66px;
    width: 100%;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    border-radius: 25px;
    transition: 0.3s;
    border: 1px solid transparent;

    &:hover {
        border: 1px solid grey;
        color: ${({ theme }) => theme.textBtn};
        /* border-radius: 25px; */
        background-color: white;
        transition: 0.3s;
    }
    &:active {
        opacity: 1;
        top: 1px;
    }
`;

interface MessageItemProps {
    user: IUser;
    onClick: () => void;
}

const UsersItem: FC<MessageItemProps> = ({ user, onClick }) => {
    return (
        <UserWrapper
            onClick={() => {
                onClick();
            }}
        >
            {user.username}
        </UserWrapper>
    );
};

export { UsersItem as MessageItem };
