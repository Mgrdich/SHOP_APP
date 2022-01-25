import {createStore} from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: Obj
export type AppDispatch = typeof store.dispatch

export default store;