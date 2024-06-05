import axios from "axios";
import { Links } from "./links";
import { Dispatch, SetStateAction } from "react";

export default class ApiService {
    static async sendLogin(
        data: { email: string; password: string },
        setIsAuth: Dispatch<SetStateAction<boolean>>,
        setShowError: (isShow: string) => void
    ) {
        try {
            await axios
                .post(Links.login, {
                    email: data.email,
                    pass: data.password,
                })
                .then(
                    (response) => {
                        if (response.status === 200) {
                            localStorage.setItem(
                                "access_token",
                                `${response.data.access_token}`
                            );
                            localStorage.setItem(
                                "refresh_token",
                                `${response.data.refresh_token}`
                            );
                            localStorage.setItem(
                                "user_id",
                                `${response.data.user_id}`
                            );
                            setIsAuth(true);
                        }
                    },
                    (error) => {
                        setIsAuth(false);
                        setShowError("block");
                        setTimeout(() => {
                            setShowError("none");
                        }, 6000);
                    }
                );
        } catch (error) {
            console.log(error);
        }
    }

    static async sendRegister(
        data: {
            email: string;
            username: string;
            password: string;
        },
        setIsAuth: Dispatch<SetStateAction<boolean>>,
        setShowError: (isShow: string) => void
    ) {
        try {
            await axios
                .post(Links.reg, {
                    email: data.email,
                    username: data.username,
                    pass: data.password,
                })
                .then(
                    (response) => {
                        if (response.status === 200) {
                            localStorage.setItem(
                                "access_token",
                                `${response.data.access_token}`
                            );
                            localStorage.setItem(
                                "refresh_token",
                                `${response.data.refresh_token}`
                            );
                            localStorage.setItem(
                                "user_id",
                                `${response.data.user_id}`
                            );
                            setIsAuth(true);
                        }
                    },
                    (error) => {
                        setShowError("block");
                        setTimeout(() => {
                            setShowError("none");
                        }, 6000);
                    }
                );
        } catch (error) {
            console.log(error);
        }
    }
    static async fetchUsers() {
        const response = await axios.get(Links.usersMessenges, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });

        return response;
    }

    static async fetchUserPersonal() {
        const response = await axios.get(Links.personalUserData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return response;
    }

    static async fetchChatMsg(
        receiver_id: string | null,
        perPage = 20,
        page = 1
    ) {
        const responce = await axios.get(Links.privateMsgHistory, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            params: {
                receiver_id: receiver_id,
                perPage: perPage,
                page: page,
            },
        });
        return responce;
    }
}
