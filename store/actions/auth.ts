import FunctionUtil from "../../util/FunctionUtil";
import CONFIGS from "../../configs";
import {setItemAsync} from "expo-secure-store";
import {ActionType} from "./types";

export enum AUTH_ACTIONS {
    AUTHENTICATE = 'AUTHENTICATE',
    LOGOUT = 'LOGOUT'
}

type AuthAction = ActionType<AUTH_ACTIONS>

async function saveToStorage(token: string, userId: string, date: Date): Promise<void> {
    return setItemAsync('userData', JSON.stringify({
        token,
        userId,
        date: date.toISOString()
    }));
}

function authFN(email: string, password: string, url: string): Function {
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

            const expirationDate: Date = new Date(
                new Date().getTime() + parseInt(res['expiresIn'] as string) * 1000
            );
            saveToStorage(res['idToken'] as string, res['localId'] as string, expirationDate)
                .catch(function () {
                });

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
    return authFN(email, password, CONFIGS.auth_signup_url);
}

export const login = (email: string, password: string) => {
    return authFN(email, password, CONFIGS.auth_signin_url);
}

export const auth = (token: string, userId: string): AuthAction => {
    return {
        type: AUTH_ACTIONS.AUTHENTICATE,
        token,
        userId
    };
}