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

            if (res.error) {
               let message:string;
                console.log(res.error);
               if(res.error.message === 'EMAIL_NOT_FOUND') {
                   console.log('s');
                   message = 'Email is Not Found'
               } else if(res.error.message === 'INVALID_PASSWORD') {
                   message = 'Invalid Password'
               }
               return Promise.reject(message || 'Something Went Wrong');
            }


            return dispatch({
                type : AUTH_ACTIONS.AUTHENTICATE,
                token: res['idToken'],
                userId: res['localId']
            });
        } catch (e) {
            throw Error('Something Went Wrong');
        }
    }
}

export const login = (email: string, password: string) => {
    return async (dispatch) => {
        try {
            let res = await FunctionUtil.post(CONFIGS.auth_signin_url, {
                email,
                password,
                returnSecureToken: true
            });

            if (res.error) {
                let message:string;
                if(res.error.message === 'EMAIL_NOT_FOUND') {
                    message = 'Email is Not Found'
                } else if(res.error.message === 'INVALID_PASSWORD') {
                    message = 'Invalid Password'
                }
                return Promise.reject(message || 'Something Went Wrong');
            }

            return dispatch({
                type : AUTH_ACTIONS.AUTHENTICATE,
                token: res['idToken'],
                userId: res['localId']
            });
        } catch (e) {
            throw Error('Something Went Wrong');
        }
    }
}