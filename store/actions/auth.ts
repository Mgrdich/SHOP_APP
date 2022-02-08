import FunctionUtil from "../../util/FunctionUtil";
import CONFIGS from "../../configs";

export enum AUTH_ACTIONS {
    AUTHENTICATE = 'AUTHENTICATE',
    LOGOUT = 'LOGOUT'
}

export const signup = (email: string, password: string) => {
    return async (dispatch) => {
        try {
            let res = await FunctionUtil.post(CONFIGS.auth_signup_url, {
                email,
                password,
                returnSecureToken: true
            });

            dispatch({
                type : AUTH_ACTIONS.AUTHENTICATE
            });
        } catch (e) {
            throw Error('Something Went Wrong');
        }
    }
}

export const login = (email: string, password: string) => {
    return async (dispatch) => {
        try {
            let res = await FunctionUtil.get(CONFIGS.auth_signin_url, {
                email,
                password,
                returnSecureToken: true
            });

            dispatch({
                type : AUTH_ACTIONS.AUTHENTICATE
            });
        } catch (e) {
            throw Error('Something Went Wrong');
        }
    }
}