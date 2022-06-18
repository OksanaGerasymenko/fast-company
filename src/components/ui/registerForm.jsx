import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQuality } from "../../hooks/useQuality";
import { useProfession } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const { professions } = useProfession();
    const { qualities } = useQuality();
    const [errors, setErrors] = useState({});
    const professionsList = professions.map(profession => ({
        label: profession.name,
        value: profession._id
    }));
    const qualitiesList = qualities.map(quality => ({
        label: quality.name,
        value: quality._id,
        color: quality.color
    }));
    const handleChange = (target) => {
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
        name: {
            isRequired: { message: "Имя обязательно к заполнению" },
            min: { message: "Имя должно быть минимум 3 символа", value: 3 }
        },
        password: {
            isRequired: { message: "Пароль обязателен к заполнению" },
            containCapitalCharacter: { message: "Пароль должен содержать хотя бы одну заглавную букву" },
            containDigit: { message: "Пароль должен содержать хотя бы одну цифру" },
            min: { message: "Пароль должен быть минимум 8 символов", value: 8 }
        },
        profession: {
            isRequired: { message: "Обязательно выберите свою профессию" }
        },
        licence: {
            isRequired: { message: "Необходимо подтвердить лицензионное соглашение" }
        }
    };

    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const { signUp } = useAuth();
    async function handleSubmit(event) {
        event.preventDefault();
        if (!validate()) return;
        const qualitiesId = data.qualities.map(q => q.value);
        const newData = { ...data, qualities: qualitiesId };
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        };
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Электронная почта"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <SelectField
                    label="Профессия"
                    value={data.profession}
                    name="profession"
                    defaultOption="выберите из списка"
                    onChange={handleChange}
                    options = {professionsList}
                    error={errors.profession}
                />
                <RadioField
                    options={[
                        { name: "Male", _id: "male" },
                        { name: "Female", _id: "female" },
                        { name: "Other", _id: "other" }
                    ]}
                    onChange={handleChange}
                    value={data.sex}
                    name="sex"
                    label="Выберите ваш пол"
                />
                <MultiSelectField
                    options = {qualitiesList}
                    name="qualities"
                    onChange={handleChange}
                    label="Укажите ваши качества"
                />
                <CheckBoxField
                    name="licence"
                    value={data.licence}
                    onChange={handleChange}
                    error={errors.licence}
                >
                    Подтвердить лицензионное соглашение
                </CheckBoxField>
                <button disabled={!isValid} className="btn btn-primary w-100 mb-4">Отправить</button>
            </form>
        </>
    );
};
export default RegisterForm;
