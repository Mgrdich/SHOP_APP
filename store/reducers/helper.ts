import {ActionType} from "../actions/types";

type handlerTypes<State, ActionT> = {
    [key: string]: (s: State, a: ActionT) => State
}

function createReducer<State, ActionTypesKey>(initialState: State, handlers: handlerTypes<State, ActionType<ActionTypesKey>>):Function {
    return function reducer(state: State = initialState, action: ActionType<ActionTypesKey>): State {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }

        return state
    }
}

export default createReducer;