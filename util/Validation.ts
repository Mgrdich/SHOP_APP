import FU from "./FunctionUtil";

export type validationRuleType = {
    name: string,
    message: string,
    validate: (inputName: any, formObj?: any) => boolean,
};

export enum ValidationRules {
    required = 'required',
    number = 'number',
    minLength = 'minLength',
    maxLength = 'maxLength',
    passwordMatch = 'passwordMatch',
    email = 'email',
    url = 'url'
}

let VALIDATION_REGEXES = {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
}

export default class Validation {
    private static RULES = {
        [ValidationRules.required]: Validation.requiredRule,
        [ValidationRules.number]: Validation.numberRule,
        [ValidationRules.minLength]: Validation.minLengthRule,
        [ValidationRules.maxLength]: Validation.maxLengthRule,
        [ValidationRules.passwordMatch]: Validation.passwordMatchRule,
        [ValidationRules.url]: Validation.urlRule,
        [ValidationRules.email]: Validation.emailRule
    };

    private static createValidationRule(ruleName: string, errorMessage: string, validateFunc: Function): validationRuleType {
        return {
            name: ruleName,
            message: errorMessage,
            validate: validateFunc,
        };
    }

    static requiredRule(inputName: string): validationRuleType {
        return Validation.createValidationRule(
            ValidationRules.required,
            `${inputName} required`,
            (inputValue) => {
                if (!inputValue) {
                    return false
                }

                if (FU.isString(inputValue)) {
                    return inputValue?.length !== 0
                }

                return !!inputValue;
            }
        );
    }

    static numberRule(inputName: string | number): validationRuleType {
        return Validation.createValidationRule(
            'required',
            `${inputName} should be a number`,
            (inputValue) => {
                if (FU.isString(inputValue)) {
                    inputName = parseFloat(inputName as string);
                    return !FU.isNaN(inputName);
                }

                return FU.isNumber(inputValue);
            }
        );
    }

    // fix this
    static minLengthRule(inputName: string, minCharacters: number = 6): validationRuleType {
        return Validation.createValidationRule(
            ValidationRules.minLength,
            `${inputName} should contain atleast ${minCharacters} characters`,
            (inputValue) => inputValue.length >= minCharacters
        );
    }

    static maxLengthRule(inputName: string, maxCharacters: number = 6): validationRuleType {
        return Validation.createValidationRule(
            ValidationRules.maxLength,
            `${inputName} cannot contain more than ${maxCharacters} characters`,
            (inputValue) => inputValue.length <= maxCharacters
        );
    }

    static passwordMatchRule(inputName: string): validationRuleType {
        return Validation.createValidationRule(
            ValidationRules.passwordMatch,
            `${inputName} do not match`,
            (inputValue, formObj) => inputValue === formObj.password.value
        );
    }

    static urlRule(inputName: string): validationRuleType {
        return Validation.createValidationRule(
            ValidationRules.passwordMatch,
            `${inputName} no a valid Url`,
            (inputValue) => {
                if (!FU.isString(inputValue)) {
                    return false;
                }

                return (inputValue as string).match(VALIDATION_REGEXES.url);
            }
        );
    }

    static emailRule(inputName: string): validationRuleType {
        return Validation.createValidationRule(
            ValidationRules.email,
            `${inputName} not a valid mail`,
            (inputValue) => {
                if (!FU.isString(inputValue)) {
                    return false;
                }

                return (inputValue as string).match(VALIDATION_REGEXES.email);
            });
    }

    static combineRules(inputName: string, rules: ValidationRules[]): validationRuleType[] {
        return rules.map(function (item: ValidationRules) {
            return Validation.RULES[item](inputName);
        });
    }
}