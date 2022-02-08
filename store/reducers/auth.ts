import createReducer from "./helper";
import {AUTH_ACTIONS} from "../actions/auth";
import {ActionType} from "../actions/types";

export interface IAuthState {
}

let initialState: IAuthState = {}

type authActionType = ActionType<AUTH_ACTIONS>

function authenticateUser(state: IAuthState, action: authActionType): IAuthState {
    return state;
}

function logoutUser(state: IAuthState, action: authActionType): IAuthState {
    return initialState;
}

const authReducer = createReducer<IAuthState, AUTH_ACTIONS>(initialState, {
    [AUTH_ACTIONS.AUTHENTICATE]: authenticateUser,
    [AUTH_ACTIONS.LOGOUT]: logoutUser
});

export default authReducer;