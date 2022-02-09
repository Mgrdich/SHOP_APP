import createReducer from "./helper";
import {AUTH_ACTIONS} from "../actions/auth";
import {ActionType} from "../actions/types";

export interface IAuthState {
    token: string,
    userId: string
}

let initialState: IAuthState = {
    token: '',
    userId: ''
}

type authActionType = ActionType<AUTH_ACTIONS>

function authenticateUser(state: IAuthState, action: authActionType): IAuthState {
    return {
        ...state,
        token: action.token,
        userId: action.userId
    };
}

function logoutUser(state: IAuthState, action: authActionType): IAuthState {
    return {
        ...initialState
    };
}

const authReducer = createReducer<IAuthState, AUTH_ACTIONS>(initialState, {
    [AUTH_ACTIONS.AUTHENTICATE]: authenticateUser,
    [AUTH_ACTIONS.LOGOUT]: logoutUser
});

export default authReducer;