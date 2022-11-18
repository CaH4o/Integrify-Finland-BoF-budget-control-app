import { combineReducers } from "@reduxjs/toolkit";

import incomeReducer from "./reducers/incomes";
import expenseReducer from "./reducers/expenses";
import balanceReducer from "./reducers/balance";
import savingsReducer from "./reducers/savings";

export const rootReducer = combineReducers({
    incomeReducer,
    expenseReducer,
    balanceReducer,
    savingsReducer
})