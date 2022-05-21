import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import api from "../../api";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionArray = Object.keys(data).map(professionName => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionArray);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesArray = Object.keys(data).map(qualityName => ({
                label: data[qualityName].name,
                value: data[qualityName]._id,
                color: data[qualityName].color
            }));
            setQualities(qualitiesArray);
        });
    }, []);
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

    const getProfessionById = (id) => {
        for (const profession of professions) {
            if (profession.value === id) {
                return {
                    _id: profession.value,
                    name: profession.label
                };
            }
        }
    };

    const getQualities = (elements) => {
        return elements.map(elem => ({
            _id: elem.value,
            name: elem.label,
            color: elem.color
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) return;
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
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
                    options = {professions}
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
                    options = {qualities}
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
