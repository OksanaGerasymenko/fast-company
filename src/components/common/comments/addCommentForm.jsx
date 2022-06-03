import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import api from "../../../api";
import PropTypes from "prop-types";

const initialDate = { userId: "", content: "" };
const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialDate);
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.users.fetchAll().then(data => {
            const usersForLabel = data.map(user => ({
                value: user._id,
                label: user.name
            }));
            setUsers(usersForLabel);
        });
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validateConfig = {
        userId: {
            isRequired: { message: "Необходимо выбрать автора комментария" }
        },
        content: {
            isRequired: { message: "Комментарий не может быть пустым" }
        }
    };

    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => { validate(); }, [data]);

    const clearForm = () => { setData(initialDate); setErrors({}); };
    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        users &&
        <form onSubmit={handleSubmit}>
            <SelectField
                label=""
                defaultOption="Выберите пользователя"
                name="userId"
                options={users}
                error={errors.userId}
                value={data.userId}
                onChange={handleChange}
            />
            <TextAreaField
                label="Сообщение"
                value={data.content}
                error={errors.content}
                onChange={handleChange}
                name="content"
            />
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" disabled={!isValid}>Опубликовать</button>
            </div>

        </form>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};
export default AddCommentForm;
