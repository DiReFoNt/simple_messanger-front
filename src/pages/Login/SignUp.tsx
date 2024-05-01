import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Links } from "../../router/links";

type FormValues = {
    email: string;
    username: string;
    password: string;
};

const SignUp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await sendRegister(data);
    };

    const [showError, setShowError] = useState<string>("none");

    async function sendRegister(data: {
        email: string;
        username: string;
        password: string;
    }) {
        try {
            const responce = await axios
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
                        }
                    },
                    (error) => {
                        setShowError("block");
                        setTimeout(() => {
                            setShowError("none");
                        },6000);
                    }
                );
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <SignInWrapper>
            <SignInWindow>
                <FormError show={showError}>This user already exists</FormError>
                <SignInTitle>Sign Up</SignInTitle>
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
                        Username
                        <SignInInput
                            placeholder="username"
                            type="text"
                            required
                            {...register("username")}
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
                    <SignInLogin type="submit" value="Register" />
                </SignInForm>
                <FormButton
                    onClick={() => {
                        navigate("/auth/login");
                    }}
                >
                    Login
                </FormButton>
            </SignInWindow>
        </SignInWrapper>
    );
};

export default SignUp;
