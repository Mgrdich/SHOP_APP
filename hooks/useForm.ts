import {SyntheticEvent, useCallback, useReducer} from "react";
import {ActionType} from "../store/actions/types";

enum USE_FORM_ACTION {
    RESET_TO_INITIAL = 'RESET_TO_INITIAL',
    DELETE_DORM_DATA = 'DELETE_DORM_DATA',
    SET_INPUT_ERROR = 'SET_INPUT_ERROR',
    UPDATE = 'UPDATE'
}

type useFormConfig = {
    validationRules: validationRuleType[],
}

type formStateType<T> = {
    formData: T,
    errors: {}
}

function formReducer<T>(state: formStateType<T>, action: ActionType<USE_FORM_ACTION>) {
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


function useForm<T>(initialState: T, config: useFormConfig) {

    const [state, dispatch] = useReducer<formStateType<T>>(formReducer, {
        formData: initialState,
        errors: {}
    });

    const resetFormToInitial = useCallback(function () {
        dispatch({type: USE_FORM_ACTION.DELETE_DORM_DATA});
    }, [dispatch]);

    const deleteFormData = useCallback(function () {
        dispatch({type: USE_FORM_ACTION.RESET_TO_INITIAL, initialState});
    }, [dispatch]);

    const onChangeHandler = useCallback(function (event: SyntheticEvent) {
        // couple of dispatches get thrown into a single render which is and optimization

        const { name, value } = event;

        // update values
        dispatch({type:USE_FORM_ACTION.UPDATE, name:name, value:value});

        if(config.validationRules.length) {
            for (const rule of config.validationRules) {
                if(!rule.validate(value)) {
                    dispatch({type:USE_FORM_ACTION.SET_INPUT_ERROR, name:name, value:value});
                }
            }
        }

    }, [dispatch, config.validationRules]);


    return {state, resetFormToInitial, deleteFormData, onChangeHandler}
}