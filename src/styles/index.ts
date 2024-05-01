import styled from "styled-components";
import img from "../assets/img/background.jpg";

export const ButtonWrapper = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    &:hover {
        opacity: 0.75;
    }
    &:active {
        opacity: 1;
        top: 1px;
    }
`;

export const InputWrapper = styled.input`
    width: 388px;
    height: 56px;
    margin: 20px;
    border-radius: 28px;
    border: none;
    background-color: #d4dce6;
    color: #000000;
    padding: 16px;
    position: fixed;
    display: relative;

    &:focus {
        background-color: #fcfaf9;
        &::placeholder {
            color: none;
            background-color: none;
            opacity: 0; /* Firefox */
        }
    }

    &::placeholder {
        color: #747c92;
        background-color: #d4dce6;
        opacity: 1; /* Firefox */
    }
`;

export const SignInWrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    background: url(${img});
    background-size: cover;
    text-align: center;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    color: white;
`;

export const SignInWindow = styled.div`
    width: 500px;
    min-height: 550px;
    max-height: 750px;
    border-radius: 30px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
    background-color: rgba(255, 255, 255, 0.13);

    & * {
        letter-spacing: 0.5px;
        outline: none;
        border: none;
    }
`;

export const SignInTitle = styled.div`
    font-size: 40px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
    margin-bottom: 20px;
    z-index: 1;
`;

export const SignInForm = styled.form`
    width: 100%;
    min-height: 350px;
    max-height: 500px;

    display: flex;
    flex-direction: column;
`;
export const SigInLabel = styled.label`
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
`;

export const SignInInput = styled.input`
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 25px;
    font-size: 14px;
    font-weight: 300;
    color: #ffffff;
    &::-webkit-input-placeholder {
        color: rgb(210, 210, 210);
    }
`;

export const SignInLogin = styled.input`
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    &:active {
        border: 1px solid #ffffff;
        color: #ffffff;
        background-color: rgba(255, 99, 71, 0);
    }
`;

export const FormButton = styled.button`
    display: flex;
    padding: 5px;
    background: none;
    color: #ffffff;
    cursor: pointer;
    margin-top: 25px;
`;

interface FormErrorProps {
    show: string;
}

export const FormError = styled.div<FormErrorProps>`
    animation: ani 0.5s;
    @keyframes ani {
        0% {opacity: 0; top: 0px;}
        100% {opacity: 1; top: 15px;}
      }
    position: absolute;
    color: red;
    top: 15px;
    z-index: 2;
    text-align: center;
    width: 420px;
    height: 25px;
    background-color: #ffbaba;
    border: 1px solid red;
    display: ${(props) => (props.show === "block" ? "block" : "none")};
`;
