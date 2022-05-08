export function validator(data, config) {
    const errors = {};
    const validate = (validateMethod, data, config) => {
        let statusValidate;
        switch (validateMethod) {
        case "isRequired":
            statusValidate = data.trim() === "";
            break;
        case "isEmail": {
            const exp = /^\S+@\S+\.\S+$/g;
            statusValidate = !exp.test(data);
            break;
        }
        case "containCapitalCharacter": {
            const exp = /[A-Z]+/g;
            statusValidate = !exp.test(data);
            break;
        }
        case "containDigit": {
            const exp = /\d+/g;
            statusValidate = !exp.test(data);
            break;
        }
        case "min": {
            statusValidate = data.length < config.value;
            break;
        }
        default: break;
        }
        if (statusValidate) return config.message;
    };
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
            if (error && !errors[fieldName]) errors[fieldName] = error;
        }
    }
    return errors;
};
