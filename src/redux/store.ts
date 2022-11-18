import { configureStore } from "@reduxjs/toolkit";
import { tExpense } from "../types/tExpense";
import { tIncome } from "../types/tIncome";
import { tSavingsTarget } from "../types/tSavingsTarget";

import { rootReducer } from "./reducers";

const income: tIncome[] = JSON.parse(localStorage.getItem("income") || "[]");
const expense: tExpense[] = JSON.parse(localStorage.getItem("expense") || "[]");
const balance: number = JSON.parse(localStorage.getItem("balance") || "0");
const savings: tSavingsTarget = JSON.parse(
  localStorage.getItem("savings") || '{"savings":0,"target":0}'
);

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    incomeReducer: income,
    expenseReducer: expense,
    balanceReducer: balance,
    savingsReducer: savings,
  },
});

store.subscribe(function () {
  localStorage.setItem(
    "income",
    JSON.stringify(store.getState().incomeReducer)
  );
  localStorage.setItem(
    "expense",
    JSON.stringify(store.getState().expenseReducer)
  );
  localStorage.setItem(
    "balance",
    JSON.stringify(store.getState().balanceReducer)
  );
  localStorage.setItem(
    "savings",
    JSON.stringify(store.getState().savingsReducer)
  );
});

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
