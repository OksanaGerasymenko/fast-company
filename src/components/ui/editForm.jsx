import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import api from "../../api";
import PropTypes from "prop-types";

const EditForm = ({ userId }) => {
    const [data, setData] = useState({});
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.users.getById(userId).then(user => {
            const userQualitiesForForm = user.qualities.map(quality => ({
                label: quality.name,
                value: quality._id,
                color: quality.color
            }));
            setData({
                _id: user._id,
                name: user.name,
                email: user.email,
                profession: user.profession._id,
                sex: user.sex,
                qualities: userQualitiesForForm
            });
        });
    }, []);

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
    useEffect(() => { validate(); console.log("data2: ", data); }, [data]);

    const validateConfig = {
        email: {
            isRequired: { message: "Электронная почта обязательна к заполнению" },
            isEmail: { message: "Электронная почта введена некорректно" }
        },
        name: {
            isRequired: { message: "Имя обязательно к заполнению" },
            min: { message: "Имя должно быть минимум 3 символа", value: 3 }
        },
        profession: {
            isRequired: { message: "Обязательно выберите свою профессию" }
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
        api.users.update(data._id, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        data._id
            ? <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h3 className="mb-4 text-center">Редактирование профиля</h3>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
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
                                value={data.qualities}
                            />
                            <div className="d-flex justify-content-evenly">
                                <button disabled={!isValid} className="btn btn-primary mb-4">Сохранить</button>
                                <Link to="/users" className="btn btn-warning mb-4">Все пользователи</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            : <>Loading...</>
    );
};
EditForm.propTypes = {
    userId: PropTypes.string.isRequired
};
export default EditForm;
