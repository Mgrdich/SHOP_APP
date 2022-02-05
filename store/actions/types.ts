import {Action, AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../index";

export interface ActionType<T> {
    type: T,

    [key: string]: any
}

export type ThunkAction<
    R, // Return type of the thunk function
    S, // state type used by getState
    E, // any "extra argument" injected into the thunk
    A extends Action // known types of actions that can be dispatched
    > = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
    >