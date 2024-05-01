export interface IUser {
    username: string;
    user_id: number;
}

export interface IMessagePrivate {
    private_msg_id: number;
    msg: string;
    time: string;
    sender: IUser;
    receiver: IUser;
}

export interface IMessagePublic {
    message_id: number;
    msg: string;
    time: string;
    user: IUser;
}

export interface IChatPublic {
    page: number;
    perPage: number;
    total: number;
    messages: IMessagePublic[];
}

export interface IChatPrivate {
    page: number;
    perPage: number;
    total: number;
    messages: IMessagePrivate[];
}
