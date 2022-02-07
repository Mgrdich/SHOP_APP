import FunctionUtil from "../../util/FunctionUtil";
import CONFIGS from "../../configs";

export enum AUTH_ACTIONS {
    SIGN_UP = 'SIGN_UP',
    LOGIN = 'LOGIN'
}

export const signup = (email: string, password: string) => {
    return async (dispatch) => {
        try {
            let res = await FunctionUtil.post(CONFIGS.auth_url, {
                email,
                password,
                returnSecureToken: true
            });

            dispatch({
                type : AUTH_ACTIONS.SIGN_UP
            });
        } catch (e) {
            throw Error('Something Went Wrong');
        }
    }
}

export const login = (email: string, password: string) => {
    return async (dispatch) => {
        try {
            let res = await FunctionUtil.get(CONFIGS.auth_url, {
                email,
                password,
                returnSecureToken: true
            });

            dispatch({
                type : AUTH_ACTIONS.LOGIN
            });
        } catch (e) {
            throw Error('Something Went Wrong');
        }
    }
}