import { configureStore } from "@reduxjs/toolkit";

import balanceReducer from "../../redux/reducers/balance";
import expenseReducer from "../../redux/reducers/expenses";
import incomeReducer from "../../redux/reducers/incomes";
import savingsReducer from "../../redux/reducers/savings";

export default function createStore() {
   const store = configureStore({
    reducer: {
      incomeReducer,
      expenseReducer,
      balanceReducer,
      savingsReducer,
    },
  });

  return store;
}
