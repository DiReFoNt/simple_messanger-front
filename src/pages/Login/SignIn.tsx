import React, { FC, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { AuthContext } from "../../context";
import ApiService from "../../API/ApiService";

type FormValues = {
    email: string;
    password: string;
};

const SignIn: FC = () => {
    const navigate = useNavigate();
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { register, handleSubmit } = useForm<FormValues>();
    const [showError, setShowError] = useState<string>("none");

    useEffect(() => {
        if (isAuth) {
            navigate("/home");
        }
    }, [isAuth]);

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setIsAuth(true);
        }
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await ApiService.sendLogin(data, setIsAuth, setShowError);
    };

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
