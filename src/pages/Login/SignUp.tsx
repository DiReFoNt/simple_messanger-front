import React, { FC, useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../context";
import ApiService from "../../API/ApiService";

type FormValues = {
    email: string;
    username: string;
    password: string;
};

const SignUp: FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormValues>();
    const [showError, setShowError] = useState<string>("none");
    const { isAuth, setIsAuth } = useContext(AuthContext);

    useEffect(() => {
        if (isAuth) {
            navigate("/home");
        }
    }, [isAuth]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await ApiService.sendRegister(data, setIsAuth, setShowError);
    };

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
