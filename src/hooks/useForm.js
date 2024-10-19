import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    const isFormValid = useMemo(() => {
        return Object.values(formValidation).every((value) => !value);
    }, [formValidation]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onReset = () => {
        setFormState(initialForm);
    };

    const createValidators = () => {
        const formCheckValues = {};

        for (const key in formValidations) {
            const [validator, message] = formValidations[key];
            const value = formState[key];
            formCheckValues[`${key}Valid`] = validator(value, formState) ? null : message;
        }
        setFormValidation(formCheckValues);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onReset,
        ...formValidation,
        formValidation,
        isFormValid,
    };
};
