import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tExpense } from "../../types/tExpense";

const initialState: tExpense[] = [];

const expensesSlicer = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpenses: function (state: tExpense[], action: PayloadAction<tExpense>) {
      return [...state, action.payload];
    },
    deleteExpenses: function (
      state: tExpense[],
      action: PayloadAction<string>
    ) {
      return state.filter((item: tExpense) => item.id !== action.payload);
    },
    sortExpensesByAmount: function (
      state: tExpense[],
      action: PayloadAction<string>
    ) {
      if (action.payload === "asc") {
        state.sort((a, b) => a.expenseAmount - b.expenseAmount);
      } else {
        state.sort((a, b) => b.expenseAmount - a.expenseAmount);
      }
    },
  },
});

const expenseReducer = expensesSlicer.reducer;
export const { addExpenses, deleteExpenses, sortExpensesByAmount } =
  expensesSlicer.actions;
export default expenseReducer;
