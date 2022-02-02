import {useCallback, useReducer} from "react";

enum USE_FORM_ACTION {
    RESET_TO_INITIAL = 'RESET_TO_INITIAL',
    DELETE_DORM_DATA = 'DELETE_DORM_DATA',
    SET_INPUT_ERROR = 'SET_INPUT_ERROR',
    UPDATE = 'UPDATE'
}

type useFormConfig = {
    validationRules: validationRuleType[],
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

export default function useForm(initialState, config?: useFormConfig): {
    // store the config with Ref if the user should assign it once
    state: State,
    resetFormToInitial: Function,
    deleteFormData: Function,
    onChangeHandler: Function
} {

    const initialRedState: State = {
        formData: initialState,
        errors: {}
    }

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

        if (config?.validationRules.length) {
            for (const rule of config.validationRules) {
                if (!rule.validate(value)) {
                    dispatch({type: USE_FORM_ACTION.SET_INPUT_ERROR, name: name, value: value});
                    // errors are in order
                    break;
                }
            }
        }

    }, [dispatch, config?.validationRules]);

    return {state, resetFormToInitial, deleteFormData, onChangeHandler};
}