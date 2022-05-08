import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => { validate(); }, [data]);

    const validateConfig = {
        email: {
            isRequired: { message: "Электронная почта обязательна к заполнению" },
            isEmail: { message: "Электронная почта введена некорректно" }
        },
        password: {
            isRequired: { message: "Пароль обязателен к заполнению" },
            containCapitalCharacter: { message: "Пароль должен содержать хотя бы одну заглавную букву" },
            containDigit: { message: "Пароль должен содержать хотя бы одну цифру" },
            min: { message: "Пароль должен быть минимум 8 символов", value: 8 }
        }
    };

    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) return;
        console.log(data);
    };

    const isValid = !(Object.keys(errors).length === 0);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4 mx-auto w-50">Авторизация</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button disabled={isValid} className="btn btn-primary w-100 mt-4">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
