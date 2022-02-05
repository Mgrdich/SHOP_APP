import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: Obj
export type AppDispatch = typeof store.dispatch

export default store;