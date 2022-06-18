import React, { useState } from "react";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";
import PropTypes from "prop-types";

const initialState = { content: "" };
const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validateConfig = {
        content: {
            isRequired: { message: "Комментарий не может быть пустым" }
        }
    };

    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const clearForm = () => { setData(initialState); setErrors({}); };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextAreaField
                label="Сообщение"
                value={data.content}
                error={errors.content}
                onChange={handleChange}
                name="content"
            />
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" >Опубликовать</button>
            </div>

        </form>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};
export default AddCommentForm;
