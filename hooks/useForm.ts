import {useCallback, useEffect, useReducer, useRef} from "react";
import {validationRuleType} from "../util/Validation";
import FU from "../util/FunctionUtil";

enum USE_FORM_ACTION {
    RESET_TO_INITIAL = 'RESET_TO_INITIAL',
    DELETE_FORM_DATA = 'DELETE_FORM_DATA',
    SET_INPUT_ERROR = 'SET_INPUT_ERROR',
    DELETE_INPUT_ERROR = 'DELETE_INPUT_ERROR',
    UPDATE = 'UPDATE'
}

type itemValidationConfig = validationRuleType | validationRuleType[]

type useFormConfig = {
    [key: string]: itemValidationConfig
}

interface State {
    formData: {
        [key: string]: any
    },
    errors: {
        [key: string]: any
    },
    touchedFields: {
        [key: string]: any
    },
    isFormTouched: boolean,
    isAllFormTouched: boolean
}

interface Action {
    type: USE_FORM_ACTION

    [key: string]: any
}

function formReducer(state: State, action: Action): State {
    switch (action.type) {
        case USE_FORM_ACTION.UPDATE:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.name]: action.value
                },
                touchedFields: {
                    ...state.formData,
                    [action.name]: true
                },
                isAllFormTouched: false,
                isFormTouched: true
            }
        case USE_FORM_ACTION.RESET_TO_INITIAL:
            return {
                ...state,
                formData: {...action.initialState},
                errors: {},
                touchedFields: {},
                isAllFormTouched: false,
                isFormTouched: false
            }
        case USE_FORM_ACTION.DELETE_FORM_DATA:
            return {
                ...state,
                formData: {},
                errors: {},
                touchedFields: {}
            };
        case USE_FORM_ACTION.DELETE_INPUT_ERROR:
            const newErrors = {...state.errors};
            delete newErrors[action.name]
            return {
                ...state,
                errors: newErrors
            }
        case USE_FORM_ACTION.SET_INPUT_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.name]: action.error
                }
            }
        default:
            return state
    }
}

// Check touch functionality
/**
 * @description validation Config is a static parameter but in every render it captures the new config
 * so the Validation is
 * */
export default function useForm(initialState, validationConfig?: useFormConfig): {
    state: State,
    resetFormToInitial: Function,
    deleteFormData: Function,
    onChangeHandler: Function,
    validateForm: Function
} {
    const initialRedState: State = {
        formData: initialState,
        errors: {},
        touchedFields: {},
        isAllFormTouched: false,
        isFormTouched: false
    };

    const [state, dispatch] = useReducer(formReducer, initialRedState as any);

    const validationConfigRef = useRef<useFormConfig | undefined>(validationConfig);

    useEffect(function () {
        validationConfigRef.current = validationConfig;
    }, [validationConfig]);

    // TODO some kind of bug with ts-lint

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

        if (validationConfigRef.current) {
            const validationItemConfig: itemValidationConfig = (validationConfigRef as useFormConfig).current[name];

            if (FU.isArray(validationItemConfig)) {

                for (const rule of validationItemConfig) {
                    if (!rule.validate(value)) {
                        dispatch({type: USE_FORM_ACTION.SET_INPUT_ERROR, name: name, error: rule.message});
                        // errors are in order
                        break;
                    }
                }
                dispatch({type: USE_FORM_ACTION.SET_INPUT_ERROR, name: name});
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

    const validateForm = useCallback<() => boolean>(function (): boolean {
        for (let inputName in validationConfigRef.current) {
            if (!state.errors[inputName]) {
                // with errors already validated
                onChangeHandler.current(inputName, state.formData[inputName]);
            }
        }

        return !!Object.keys(state.errors).length;
    }, [state, validationConfigRef, onChangeHandler]);

    return {
        state,
        validateForm,
        resetFormToInitial: resetFormToInitial.current,
        deleteFormData: deleteFormData.current,
        onChangeHandler: onChangeHandler.current
    };
}