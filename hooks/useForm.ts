import {useCallback, useReducer} from "react";
import {validationRuleType} from "../util/Validation";
import FU from "../util/FunctionUtil";

enum USE_FORM_ACTION {
    RESET_TO_INITIAL = 'RESET_TO_INITIAL',
    DELETE_DORM_DATA = 'DELETE_DORM_DATA',
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
    }
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
                }
            }
        case USE_FORM_ACTION.RESET_TO_INITIAL:
            return {
                ...state,
                formData: {...action.initialState},
                errors: {}
            }
        case USE_FORM_ACTION.DELETE_DORM_DATA:
            return {
                ...state,
                formData: {},
                errors: {}
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
export default function useForm(initialState, validationConfig?: useFormConfig): {
    // store the config with Ref if the user should assign it once
    state: State,
    resetFormToInitial: Function,
    deleteFormData: Function,
    onChangeHandler: Function
} {
    const initialRedState: State = {
        formData: initialState,
        errors: {}
    };

    // TODO some kind of bug with ts-lint
    const [state, dispatch] = useReducer(formReducer, initialRedState as any);

    const resetFormToInitial = useCallback(function () {
        dispatch({type: USE_FORM_ACTION.DELETE_DORM_DATA});
    }, [dispatch]);

    const deleteFormData = useCallback(function () {
        dispatch({type: USE_FORM_ACTION.RESET_TO_INITIAL, initialState});
    }, [dispatch]);

    const onChangeHandler = useCallback(function (name, value) {
        // couple of dispatches get thrown into a single render which is and optimization

        // update values
        dispatch({type: USE_FORM_ACTION.UPDATE, name: name, value: value});

        if (validationConfig) {
            const validationItemConfig: itemValidationConfig = validationConfig[name];

            if (FU.isArray(validationItemConfig)) {

                for (const rule of validationItemConfig) {
                    if (!rule.validate(value)) {
                        dispatch({type: USE_FORM_ACTION.SET_INPUT_ERROR, name: name, error: rule.message});
                        // errors are in order
                        break;
                    }
                }

                if (state.errors[name]) {
                    dispatch({type: USE_FORM_ACTION.SET_INPUT_ERROR, name: name});
                }
                 
                return;
            }

            const isValid: boolean = (validationItemConfig as validationRuleType).validate(value);

            if (isValid) {
                if (state.errors[name]) {
                    dispatch({
                        type: USE_FORM_ACTION.DELETE_INPUT_ERROR,
                        name: name,
                        error: (validationItemConfig as validationRuleType).message
                    });
                }
                return;
            }

            dispatch({
                type: USE_FORM_ACTION.SET_INPUT_ERROR,
                name: name,
                error: (validationItemConfig as validationRuleType).message
            });
        }

    }, [dispatch, validationConfig]);

    return {state, resetFormToInitial, deleteFormData, onChangeHandler};
}