import React, { useEffect } from "react";
import { FormSpy } from "react-final-form";
import { getIn } from "final-form";

import { validatorFunctions } from "./validators/validator";
import { isEmpty } from "./utils";
import { AllValues, CustomValidatorsType, FieldValue, MutatorsFunction, Rule } from "./types";

export const genericValidator = (
    rules: Rule[],
    value: FieldValue,
    customValidators: CustomValidatorsType,
    allValues: AllValues
): undefined | string => {
    let error = undefined;
    const validators = { ...customValidators, ...validatorFunctions }
    for (let i = 0; i < rules.length; i++) {
        const { type, ...restRules } = rules[i];
        const errorMsg = validators[type](value, restRules, allValues)
        if (errorMsg !== undefined) {
            error = errorMsg;
            break;
        }
    }
    return error;
}

export type ValidatorSpyProps = {
    rules: Rule[];
    values: AllValues;
    touched: Record<string, unknown>;
    customValidators: CustomValidatorsType
    form: {
        mutators: MutatorsFunction
    }
}

const ValidatorSpy = (props: ValidatorSpyProps) => {
    const {
        rules,
        values,
        touched,
        customValidators,
        form: { mutators: { setFieldData } },
    } = props

    const getTouched = (touched) => {
        const currentTouched = {};
        for (const field in touched) {
            if (touched[field] === true) {
                currentTouched[field] = true;
            }
        }
        return currentTouched;
    }

    useEffect(() => {
        const activeTouched = getTouched(touched)
        if (!isEmpty(activeTouched)) {
            for (const activeField in activeTouched) {
                const rule = rules[activeField];
                if (!isEmpty(rule)) {
                    const value = getIn(values, activeField)
                    let isSync = false

                    const setError = error => {
                        setFieldData(activeField, { error, validating: false })
                        isSync = true
                    }

                    const error = genericValidator(rule, value, customValidators, values)

                    setError(error);

                    if (!isSync) {
                        setFieldData(activeField, { validating: true })
                    }
                }
            }
        }
    }, [
        touched,
        rules,
        values,
        customValidators,
        setFieldData
    ]);

    return <></>;
}

const Validator = (props): JSX.Element => {
    return (
        <FormSpy
            {...props}
            subscription={{ active: true, values: true, touched: true }}
            component={ValidatorSpy}
        />
    )
}

export default Validator;
