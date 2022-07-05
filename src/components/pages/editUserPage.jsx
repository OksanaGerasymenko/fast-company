import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import ImageField from "../../components/common/form/imageField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useSelector, useDispatch } from "react-redux";
import { getQualities, getQualitiesLoadingStatus, getQualitiesByIds } from "../../store/qualities";
import { getProfessions, getProfessionsLoadingStatus } from "../../store/professions";
import { getCurrentUser, updateUser } from "../../store/users";

const EditUserPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser());
    const professions = useSelector(getProfessions());
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const qualities = useSelector(getQualities());
    const qualityLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesUser = useSelector(getQualitiesByIds(currentUser.qualities));
    const qualitiesForForm = qualitiesUser?.map(quality => ({
        label: quality.name,
        value: quality._id,
        color: quality.color
    }));
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const [data, setData] = useState({
        _id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        image: currentUser.image,
        profession: currentUser.profession,
        sex: currentUser.sex,
        qualities: qualitiesForForm,
        rate: currentUser.rate,
        completedMeetings: currentUser.completedMeetings
    });
    const professionsList = professions?.map(profession => ({
        label: profession.name,
        value: profession._id
    }));
    const qualitiesList = qualities?.map(quality => ({
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
        profession: {
            isRequired: { message: "Обязательно выберите свою профессию" }
        }
    };

    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    async function handleSubmit(event) {
        event.preventDefault();
        if (!validate()) return;
        const qualitiesId = data.qualities.map(q => q.value);
        const newData = { ...data, qualities: qualitiesId };
        dispatch(updateUser(newData));
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        (!professionLoading && !qualityLoading)
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
                            <ImageField
                                label="фото"
                                name="image"
                                onChange={handleChange}
                                value={data.image}
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
                                value={data.qualities}
                            />
                            <div className="d-flex justify-content-evenly">
                                <button className="btn btn-primary mt-4" onClick={() => history.goBack()}>
                                    <i className="bi bi-caret-left-fill"></i>
                            Назад
                                </button>
                                <button disabled={!isValid} className="btn btn-primary mt-4">Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            : <>Loading...</>
    );
};
export default EditUserPage;
