import {applyMiddleware, combineReducers, createStore} from "redux";

import thunk from "redux-thunk";
import {transactionReducers} from "./transactions";
import {authReducers} from "./auth";

const rootReducer = combineReducers({
    auth: authReducers,
    transactions: transactionReducers
});

export const store = createStore(rootReducer, applyMiddleware(thunk));