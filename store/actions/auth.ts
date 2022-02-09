import {AsyncStorage} from "react-native";
import FunctionUtil from "../../util/FunctionUtil";
import CONFIGS from "../../configs";

export enum AUTH_ACTIONS {
    AUTHENTICATE = 'AUTHENTICATE',
    LOGOUT = 'LOGOUT'
}

function auth(email: string, password: string, url: string):Function {
    return async (dispatch) => {
        try {
            let res = await FunctionUtil.post(url, {
                email,
                password,
                returnSecureToken: true
            });

            if (res.error) {
                let message: string;
                if (res.error.message === 'EMAIL_NOT_FOUND') {
                    message = 'Email is Not Found'
                } else if (res.error.message === 'INVALID_PASSWORD') {
                    message = 'Invalid Password'
                }
                return Promise.reject(message || 'Something Went Wrong');
            }


            return dispatch({
                type: AUTH_ACTIONS.AUTHENTICATE,
                token: res['idToken'],
                userId: res['localId']
            });
        } catch (e) {
            throw Error('Something Went Wrong');
        }
    }
}


export const signup = (email: string, password: string) => {
    return auth(email, password ,CONFIGS.auth_signup_url);
}

export const login = (email: string, password: string) => {
    return auth(email, password ,CONFIGS.auth_signin_url);
}