import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import groupReducer from "./group/group.api";
import secuReducer from "./security/secu.api";

//Reducers
import userReducer from "./user/user.api";

let reducers = combineReducers({
    user: userReducer,
    secu: secuReducer,
    group: groupReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
