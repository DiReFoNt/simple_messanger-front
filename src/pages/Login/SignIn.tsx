import React, {
    FC,
    SyntheticEvent,
    useContext,
    useEffect,
    useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    FormButton,
    FormError,
    SigInLabel,
    SignInForm,
    SignInInput,
    SignInLogin,
    SignInTitle,
    SignInWindow,
    SignInWrapper,
} from "../../styles";
import { Links } from "../../router/links";
import { AuthContext } from "../../context";

type FormValues = {
    email: string;
    password: string;
};

const SignIn: FC = () => {
    const navigate = useNavigate();
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await sendLogin(data);
    };
    const [showError, setShowError] = useState<string>("none");

    useEffect(() => {
        if (isAuth) {
            navigate("/home");
        }
    }, [isAuth]);

    async function sendLogin(data: { email: string; password: string }) {
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
                            setIsAuth(true);
                        }
                    },
                    (error) => {
                        setIsAuth(false);
                        setShowError("block");
                        setTimeout(() => {
                            setShowError("none");
                        }, 6000);
                        return false;
                    }
                );
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <SignInWrapper>
            <SignInWindow>
                <FormError show={showError}>Wrong password or email</FormError>
                <SignInTitle>Sign In</SignInTitle>
                <SignInForm onSubmit={handleSubmit(onSubmit)}>
                    <SigInLabel>
                        Email Address
                        <SignInInput
                            type="email"
                            placeholder="example@email.com"
                            required
                            {...register("email")}
                        />
                    </SigInLabel>
                    <SigInLabel>
                        Password
                        <SignInInput
                            placeholder="Password"
                            type="password"
                            required
                            {...register("password")}
                        />
                    </SigInLabel>
                    <SignInLogin type="submit" value="Log In" />
                </SignInForm>
                <FormButton
                    onClick={() => {
                        navigate("/auth/signup");
                    }}
                >
                    Sign Up
                </FormButton>
            </SignInWindow>
        </SignInWrapper>
    );
};

export default SignIn;
