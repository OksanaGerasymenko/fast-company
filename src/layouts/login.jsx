import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [typeForm, setTypeForm] = useState(type === "register" ? type : "login");
    const toggleTypeForm = () => {
        setTypeForm((prevState) => prevState === "register" ? "login" : "register");
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {
                        typeForm === "register"
                            ? (
                                <>
                                    <h3 className="mb-4 mx-auto w-50">Регистрация</h3>
                                    <RegisterForm />
                                    <p>Already have an account?&nbsp;
                                        <a
                                            role="button"
                                            onClick={toggleTypeForm}
                                            className="link-primary"
                                        >
                                            SignUp
                                        </a>
                                    </p>
                                </>
                            )
                            : (
                                <>
                                    <h3 className="mb-4 mx-auto w-50">Авторизация</h3>
                                    <LoginForm />
                                    <p>Dont have an account?&nbsp;
                                        <a
                                            className="link-primary"
                                            role="button"
                                            onClick={toggleTypeForm}
                                        >
                                            SignIn
                                        </a>
                                    </p>
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;
