import { AllValues } from "../types";
import { isEmpty } from "../utils";

type ValidatorReturn = string | undefined;

type Rule = {
    when?: {
        [key: string]: string;
    };
    message?: string;
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
}

type Value = number | string | string[];

export const validatorFunctions = {
    required: (value: Value, rule: Rule, allValues: AllValues): ValidatorReturn => {
        let isCriteria = true;
        if (!isEmpty(rule.when)) {
            for (const field in rule.when) {
                if (allValues[field] !== rule.when[field]) {
                    isCriteria = false;
                }
            }
        }
        if (isCriteria && isEmpty(value)) {
            return rule.message;
        }
        return undefined;
    },
    regex: (value: Value, rule: Rule, allValues: AllValues): ValidatorReturn => {
        if (typeof value === "string" && !new RegExp(rule.pattern).test(value)) {
            return rule.message;
        }
        return undefined;
    },
    number: (value: Value, rule: Rule, allValues: AllValues): ValidatorReturn => {
        if (isNaN(Number(value))) {
            return rule.message;
        }
        if (rule.min && rule.min > value) {
            return rule.message;
        }
        if (rule.max && rule.max < value) {
            return rule.message;
        }
        return undefined;
    },
    string: (value: Value, rule: Rule, allValues: AllValues): ValidatorReturn => {
        if (typeof value !== "string") {
            return rule.message;
        }
        if (rule.minLength && rule.minLength > value.length) {
            return rule.message;
        }
        if (rule.maxLength && rule.maxLength < value.length) {
            return rule.message;
        }
        return undefined;
    },
    email: (value: Value, rule: Rule, allValues: AllValues): ValidatorReturn => {
        // eslint-disable-next-line max-len
        const regex = (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
        if (!regex.test(value.toString())) {
            return rule.message;
        }
        return undefined;
    }
}
