import createReducer from "./helper";
import {AUTH_ACTIONS} from "../actions/auth";
import {ActionType} from "../actions/types";

interface IAuthState {

}


type authActionType = ActionType<AUTH_ACTIONS>

function loginUser(state: IAuthState, action: authActionType): IAuthState {
    return state;
}

function signUpUser(state: IAuthState, action: authActionType): IAuthState {
    return state;
}

const authReducer = createReducer<IAuthState, AUTH_ACTIONS>({}, {
    [AUTH_ACTIONS.LOGIN]: loginUser,
    [AUTH_ACTIONS.SIGN_UP]: signUpUser
});