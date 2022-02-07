import {useEffect, useReducer, useRef} from "react";
import {validationRuleType} from "../util/Validation";
import FU from "../util/FunctionUtil";
import {Dictionary} from "../types";

enum USE_FORM_ACTION {
    RESET_TO_INITIAL = 'RESET_TO_INITIAL',
    DELETE_FORM_DATA = 'DELETE_FORM_DATA',
    SET_INPUT_ERROR = 'SET_INPUT_ERROR',
    DELETE_INPUT_ERROR = 'DELETE_INPUT_ERROR',
    UPDATE = 'UPDATE'
}

type itemValidationConfig = validationRuleType | validationRuleType[]

type useFormConfig = Dictionary<itemValidationConfig>;

interface State {
    formData: Dictionary,
    errors: Dictionary,
    touchedFields: Dictionary,
    isFormTouched: boolean,
    isAllFormTouched: boolean,
    isValidWithCurrentChanges: boolean,
    isValid: boolean,
    isNotValid: boolean
}

interface Action extends Dictionary {
    type: USE_FORM_ACTION
}

function formReducer(state: State, action: Action): State {
    switch (action.type) {
        case USE_FORM_ACTION.UPDATE: {
            const touchedFields = {
                ...state.touchedFields,
                [action.name]: true
            };

            const formData = {
                ...state.formData,
                [action.name]: action.value
            }

            const allFormTouched: boolean = Object.keys(formData).length === Object.keys(touchedFields).length;

            let isError: boolean = !!Object.keys(state.errors).length;
            let isValid: boolean = allFormTouched && !isError;

            return {
                ...state,
                formData: formData,
                touchedFields: touchedFields,
                isAllFormTouched: allFormTouched,
                isFormTouched: true,
                isValidWithCurrentChanges: !isError,
                isValid: isValid,
                isNotValid: !isValid
            }
        }
        case USE_FORM_ACTION.RESET_TO_INITIAL:
            return {
                ...state,
                formData: {...action.initialState},
                errors: {},
                touchedFields: {},
                isAllFormTouched: false,
                isFormTouched: false,
                isValidWithCurrentChanges: false,
                isValid: false,
                isNotValid: true
            }
        case USE_FORM_ACTION.DELETE_FORM_DATA:
            return {
                ...state,
                formData: {},
                errors: {},
                touchedFields: {}
            };
        case USE_FORM_ACTION.DELETE_INPUT_ERROR: {
            const newErrors = {...state.errors};
            delete newErrors[action.name]

            let isError: boolean = !!Object.keys(newErrors).length;
            let isValid = state.isAllFormTouched && !isError;

            return {
                ...state,
                errors: newErrors,
                isValidWithCurrentChanges: !isError,
                isValid: isValid,
                isNotValid: !isValid
            }
        }
        case USE_FORM_ACTION.SET_INPUT_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.name]: action.error
                },
                isValidWithCurrentChanges: false,
                isValid: false,
                isNotValid: true
            }
        default:
            return state
    }
}


/**
 * @description validation Config is a static parameter but in every render it captures the new config
 * so the Validation is
 * */
export default function useForm(initialState: Dictionary, validationConfig?: useFormConfig): {
    state: State,
    resetFormToInitial: Function,
    deleteFormData: Function,
    onChangeHandler: Function,
    validateForm: Function,
    isValidForSubmit:Function
} {
    const initialRedState: State = {
        formData: initialState,
        errors: {},
        touchedFields: {},
        isAllFormTouched: false,
        isFormTouched: false,
        isValidWithCurrentChanges: false,
        isValid: false,
        isNotValid: true
    };

    // TODO some kind of bug with ts-lint
    const [state, dispatch] = useReducer(formReducer, initialRedState as any);

    const validationConfigRef = useRef<useFormConfig | undefined>(validationConfig);
    const stateRef = useRef<State>(state);

    useEffect(function () {
        stateRef.current = state;
    });

    useEffect(function () {
        validationConfigRef.current = validationConfig;
    }, [validationConfig]);

    const resetFormToInitial = useRef<Function>(function () {
        // static function code optimizations
        dispatch({type: USE_FORM_ACTION.DELETE_FORM_DATA});
    });

    const deleteFormData = useRef<Function>(function () {
        // static function code optimizations
        dispatch({type: USE_FORM_ACTION.RESET_TO_INITIAL, initialState});
    });

    const onChangeHandler = useRef<Function>(function (name: string, value: any) {
        // couple of dispatches get thrown into a single render which is and optimization

        // update values
        dispatch({type: USE_FORM_ACTION.UPDATE, name: name, value: value});

        // console.log(validationConfigRef.current);
        if (validationConfigRef.current) {
            const validationItemConfig: itemValidationConfig = (validationConfigRef as useFormConfig).current[name];


            if (FU.isArray(validationItemConfig)) {
                for (const rule of validationItemConfig) {
                    if (!rule.validate(value)) {
                        dispatch({type: USE_FORM_ACTION.SET_INPUT_ERROR, name: name, error: rule.message});
                        // errors are in order
                        return;
                    }
                }

                dispatch({type: USE_FORM_ACTION.DELETE_INPUT_ERROR, name: name});
                return;
            }

            const isValid: boolean = (validationItemConfig as validationRuleType).validate(value);

            if (isValid) {
                dispatch({
                    type: USE_FORM_ACTION.DELETE_INPUT_ERROR,
                    name: name,
                    error: (validationItemConfig as validationRuleType).message
                });
                return;
            }

            dispatch({
                type: USE_FORM_ACTION.SET_INPUT_ERROR,
                name: name,
                error: (validationItemConfig as validationRuleType).message
            });
        }

    });

    const validateForm = useRef<() => boolean>(function (): boolean {
        // this is for fast checking this function call shouldn't be called in this case anyways be smart
        let state = stateRef.current;

        if (state.isAllFormTouched) {
            return state.isValid;
        }
        for (let inputName in validationConfigRef.current) {
            if (!state.errors[inputName]) {
                // with errors already validated
                onChangeHandler.current(inputName, state.formData[inputName]);
            }
        }

        return !Object.keys(state.errors).length;
    });

    const isValidForSubmit = useRef<() => boolean>(function () {
        let state = stateRef.current;

        if (state.isAllFormTouched) {
            return state.isValid;
        }

        return validateForm.current();
    });


    return {
        state,
        validateForm: validateForm.current,
        resetFormToInitial: resetFormToInitial.current,
        deleteFormData: deleteFormData.current,
        onChangeHandler: onChangeHandler.current,
        isValidForSubmit: isValidForSubmit.current
    };
}