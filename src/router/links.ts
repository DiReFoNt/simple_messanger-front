const url = "http://localhost:3001";

const login: string = `${url}/auth/signIn`;
const reg: string = `${url}/auth/signUp`;
const usersMessenges: string = `${url}/ws/clients`;
const privateMsgHistory: string = `${url}/ws/private?receiver_id=`;

export const Links = {
    login,
    reg,
    usersMessenges,
    privateMsgHistory
};
