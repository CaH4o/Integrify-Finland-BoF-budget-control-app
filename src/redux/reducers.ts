import { combineReducers } from "@reduxjs/toolkit";


import incomeReducer from "./reducers/incomes";
import expenseReducer from "./reducers/expenses";
import balanceReducer from "./reducers/balance";
import saivingsReducer from "./reducers/saivings";

export const rootReducer = combineReducers({
    incomeReducer,
    expenseReducer,
    balanceReducer,
    saivingsReducer
})