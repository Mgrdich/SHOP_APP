type validationRuleType = {
    name: string,
    message: string,
    validate: Function,
};

class Validation {
    private static createValidationRule(ruleName: string, errorMessage: string, validateFunc: Function): validationRuleType {
        return {
            name: ruleName,
            message: errorMessage,
            validate: validateFunc,
        };
    }

    static requiredRule(inputName: string): validationRuleType {
        return Validation.createValidationRule(
            'required',
            `${inputName} required`,
            (inputValue, formObj) => inputValue.length !== 0
        );
    }

    static minLengthRule(inputName: string, minCharacters: number): validationRuleType {
        return Validation.createValidationRule(
            'minLength',
            `${inputName} should contain atleast ${minCharacters} characters`,
            (inputValue, formObj) => inputValue.length >= minCharacters
        );
    }

    
}