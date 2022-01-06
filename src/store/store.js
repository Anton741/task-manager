import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import errorReducer from "./errors";
import  taskReducer  from "./tasks";

const rootReducer = combineReducers({tasks:taskReducer, errors:errorReducer})
export function initiateStore() {
    return configureStore ({
        reducer: rootReducer,
        middleware: [thunk],
        devTools: process.env.NODE_ENV !=='production',
    });
}
